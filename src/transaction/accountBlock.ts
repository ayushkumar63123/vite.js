const BigNumber = require('bn.js');
const blake = require('blakejs/blake2b');

import { checkParams, isHexString, ed25519 } from '~@vite/vitejs-utils';
import { getRealAddressFromAddress, createAddressByPrivateKey, getAddressFromPublicKey } from  '~@vite/vitejs-hdwallet/address';

import {
    isRequestBlock, isResponseBlock, checkAccountBlock, Default_Hash, getAccountBlockHash,
    getBlockTypeHex, getHeightHex, getAddressHex, getToAddressHex, getDataHex,
    getAmountHex, getFeeHex, getNonceHex, getPreviousHashHex, getTokenIdHex, getSendBlockHashHex
} from './utils';
import { Address, Hex, Base64, BigInt, Uint64, BlockType, ViteAPI, TokenId, AccountBlockBlock } from './type';

class AccountBlockClass {
    blockType: BlockType;
    address: Address;
    fee?: BigInt;
    data?: Base64;
    sendBlockHash?: Hex;
    toAddress?: Address;
    tokenId?: TokenId;
    amount?: BigInt;
    height?: Uint64;
    previousHash?: Hex;
    difficulty?: BigInt;
    nonce?: Base64;
    signature?: Base64;
    publicKey?: Base64;

    constructor({ blockType, address, fee, data, sendBlockHash, amount, toAddress, tokenId }: {
        blockType: BlockType;
        address: Address;
        fee?: BigInt;
        data?: Base64;
        sendBlockHash?: Hex;
        amount?: BigInt;
        toAddress?: Address;
        tokenId?: TokenId;
    }) {
        const err = checkAccountBlock({ blockType, address, fee, data, sendBlockHash, amount, toAddress, tokenId });
        if (!err) {
            throw err;
        }

        this.blockType = blockType;
        this.address = address;
        this.fee = fee;
        this.data = data;
        this.sendBlockHash = sendBlockHash;
        this.amount = amount;
        this.toAddress = toAddress;
        this.tokenId = tokenId;
    }

    get accountBlock(): AccountBlockBlock {
        return {
            blockType: this.blockType,
            address: this.address,
            fee: this.fee,
            data: this.data,
            sendBlockHash: this.sendBlockHash,
            toAddress: this.toAddress,
            tokenId: this.tokenId,
            amount: this.amount,
            height: this.height,
            previousHash: this.previousHash,
            difficulty: this.difficulty,
            nonce: this.nonce,
            hash: this.hash,
            publicKey: this.publicKey,
            signature: this.signature
        };
    }

    get realAddress(): Hex {
        return getRealAddressFromAddress(this.address);
    }

    get blockTypeHex(): Hex {
        return getBlockTypeHex(this.blockType);
    }

    get previousHashHex(): Hex {
        return getPreviousHashHex(this.previousHash);
    }

    get heightHex(): Hex {
        return getHeightHex(this.height);
    }

    get addressHex(): Hex {
        return getAddressHex(this.address);
    }

    get toAddressHex(): Hex {
        return getToAddressHex(this.toAddress);
    }

    get amountHex(): Hex {
        return getAmountHex(this.amount);
    }

    get tokenIdHex(): Hex {
        return getTokenIdHex(this.tokenId);
    }

    get sendBlockHashHex(): Hex {
        return getSendBlockHashHex(this.sendBlockHash);
    }

    get dataHex(): Hex {
        return getDataHex(this.data);
    }

    get feeHex(): Hex {
        return getFeeHex(this.fee);
    }

    get nonceHex(): Hex {
        return getNonceHex(this.nonce);
    }

    get isRequestBlock(): Boolean {
        return isRequestBlock(this.blockType);
    }

    get isResponseBlock(): Boolean {
        return isResponseBlock(this.blockType);
    }

    get hash(): Hex {
        return getAccountBlockHash(this.accountBlock);
    }

    async getHeight(viteAPI: ViteAPI): Promise<{height: Uint64; previousHash: Hex }> {
        const previousAccountBlock = await viteAPI.request('ledger_getLatestAccountBlock', this.address);

        let height: Uint64 = previousAccountBlock && previousAccountBlock.height ? previousAccountBlock.height : '';
        height = height ? new BigNumber(height).add(new BigNumber(1)).toString() : '1';
        const previousHash: Hex = previousAccountBlock && previousAccountBlock.hash ? previousAccountBlock.hash : Default_Hash;
        return { height, previousHash };
    }

    setHeight({ height, previousHash }: {
        height: Uint64;
        previousHash: Hex;
    }) {
        this.height = height;
        this.previousHash = previousHash;
    }

    async getDifficulty(viteAPI: ViteAPI): Promise<{
        requiredQuota: Uint64;
        difficulty: BigInt;
        qc: BigInt;
        isCongestion: Boolean;
    }> {
        const err = checkParams(this.accountBlock, ['previousHash']);
        if (err) {
            throw err;
        }

        const result: {
            requiredQuota: Uint64;
            difficulty: BigInt;
            qc: BigInt;
            isCongestion: Boolean;
        } = await viteAPI.request('ledger_getPoWDifficulty', {
            address: this.address,
            previousHash: this.previousHash,
            blockType: this.blockType,
            toAddress: this.toAddress,
            data: this.data
        });

        return result;
    }

    setDifficulty(difficulty: BigInt) {
        this.difficulty = difficulty;
    }

    async getNonce(viteAPI: ViteAPI): Promise<Base64> {
        const err = checkParams({
            difficulty: this.difficulty,
            previousHash: this.previousHash
        }, [ 'difficulty', 'previousHash' ]);
        if (err) {
            throw err;
        }

        const getNonceHashBuffer = Buffer.from(this.realAddress + this.previousHash, 'hex');
        const getNonceHash = blake.blake2bHex(getNonceHashBuffer, null, 32);
        const nonce: Base64 = viteAPI.request('util_getPoWNonce', this.difficulty, getNonceHash);

        return nonce;
    }

    setNonce(nonce: Base64) {
        this.nonce = nonce;
    }

    async autoSetNonce(viteAPI: ViteAPI): Promise<{difficulty: BigInt; nonce: Base64}> {
        const result = await this.getDifficulty(viteAPI);
        this.setDifficulty(result.difficulty);

        const nonce: Base64 = this.difficulty ? await this.getNonce(viteAPI) : null;
        this.setNonce(nonce);

        return {
            difficulty: this.difficulty,
            nonce: this.nonce
        };
    }

    setPublicKey(publicKey: Buffer | Hex) {
        const err = checkParams({ publicKey }, ['publicKey'], [{
            name: 'publicKey',
            func: _p => _p instanceof Buffer || isHexString(_p),
            msg: 'PublicKey is Buffer or Hex-string'
        }]);

        if (err) {
            throw err;
        }

        const address = getAddressFromPublicKey(publicKey);
        if (this.address !== address) {
            throw new Error('PublicKey is wrong.');
        }

        const _publicKey = publicKey instanceof Buffer ? publicKey : Buffer.from(publicKey, 'hex');
        this.publicKey = _publicKey.toString('base64');
    }

    setSignature(signature: Base64) {
        this.signature = signature;
    }

    sign(privateKey: Buffer | Hex): AccountBlockBlock {
        const err = checkParams({ privateKey }, ['privateKey'], [{
            name: 'privateKey',
            func: _p => _p instanceof Buffer || isHexString(_p),
            msg: 'PrivateKey is Buffer or Hex-string'
        }]);

        if (err) {
            throw err;
        }

        const _privateKey: Buffer = privateKey instanceof Buffer ? privateKey : Buffer.from(privateKey, 'hex');
        const {
            address,
            publicKey
        } = createAddressByPrivateKey(_privateKey);
        if (this.address !== address) {
            throw new Error('PrivateKey is wrong.');
        }

        this.setPublicKey(publicKey);
        this.setSignature(ed25519.sign(this.hash, _privateKey));
        return this.accountBlock;
    }
}

export const AccountBlock = AccountBlockClass;
export default AccountBlockClass;
