const assert = require('assert');

import Client from '../../src/client/index';
import netProcessor from '../../src/netProcessor';
import { methods } from '../../src/constant';
import HTTP_RPC from '../../src/HTTP';

const myWSClient = new Client({ type: 'ws' });
const myHTTPClient = new Client(new HTTP_RPC());
const myIPCClient = new Client({ type: 'ipc' });

describe('WS Client', function () {
    testFunc(['wallet'], myWSClient);
});

describe('HTTP Client', function () {
    testFunc(['wallet'], myHTTPClient);
});

describe('IPC Client', function () {
    testFunc([], myIPCClient);
});


function testFunc(notIncluded, client) {
    it('extends of netProcessor', function () {
        assert.equal(client instanceof netProcessor, true);
    });

    for (const space in methods) {
        if (notIncluded.indexOf(space) !== -1) {
            it(`client.${ space } null`, function () {
                assert.equal(!!client[space], false);
            });
            continue;
        }

        it(`client.${ space }`, function () {
            assert.equal(!!client[space], true);
        });

        const namespace = space === 'subscribe' ? 'subscribeFunc' : space;

        for (const method in methods[space]) {
            it(`client.${ namespace }.${ method }`, function () {
                assert.equal(typeof client[namespace][method], 'function');
            });
        }
    }
}