const assert = require('assert');

import abi from 'utils/abi/index';

describe('utils/tools', function () {
    it('encodeParameter', function () {
        let _r = abi.encodeParameter('uint256', '2345675643');
        assert.equal('000000000000000000000000000000000000000000000000000000008bd02b7b', _r);

        let _e = abi.encodeParameter('bytes32', '0xdf3234');
        assert.equal('df32340000000000000000000000000000000000000000000000000000000000', _e);
        
        let result = abi.encodeParameter('tokenId', 'tti_5649544520544f4b454e6e40');
        assert.equal('000000000000000000000000000000000000000000005649544520544f4b454e', result);

        let encodeParameterResult1 = abi.encodeParameter('uint8', '2');
        assert.equal('0000000000000000000000000000000000000000000000000000000000000002', encodeParameterResult1);

        let _xxx = abi.encodeParameter('bytes', '0xdf3234');
        assert.equal('00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000003df32340000000000000000000000000000000000000000000000000000000000', _xxx);
        
        let encodeParameterResult3 = abi.encodeParameter('uint16', '2');
        assert.equal('0000000000000000000000000000000000000000000000000000000000000002', encodeParameterResult3);
        
        let encodeParameterResult4 = abi.encodeParameter('uint16[]', [1,2]);
        assert.equal('000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002', encodeParameterResult4);

        let encodeParameterResult2 = abi.encodeParameter('uint8[]', ['1','2']);
        assert.equal('000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002', encodeParameterResult2);
    
        let encodeParameterResult5 = abi.encodeParameter('uint32', '2');
        assert.equal('0000000000000000000000000000000000000000000000000000000000000002', encodeParameterResult5);

        let encodeParameterResult6 = abi.encodeParameter('uint32[]', [1,2]);
        assert.equal('000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002', encodeParameterResult6);

        let encodeParameterResult7 = abi.encodeParameter('uint64', '2');
        assert.equal('0000000000000000000000000000000000000000000000000000000000000002', encodeParameterResult7);
        
        let encodeParameterResult8 = abi.encodeParameter('uint64[]', [1,2]);
        assert.equal('000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002', encodeParameterResult8);
        
        let encodeParameterResult9 = abi.encodeParameter('uint256', '2');
        assert.equal('0000000000000000000000000000000000000000000000000000000000000002', encodeParameterResult9);

        let encodeParameterResult10 = abi.encodeParameter('uint256[]', [1,2]);
        assert.equal('000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002', encodeParameterResult10);

        let encodeParameterResult11 = abi.encodeParameter('int8', '2');
        assert.equal('0000000000000000000000000000000000000000000000000000000000000002', encodeParameterResult11);

        let encodeParameterResult12 = abi.encodeParameter('int8[]', [1,2]);
        assert.equal('000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002', encodeParameterResult12);

        let encodeParameterResult13 = abi.encodeParameter('int16', '2');
        assert.equal('0000000000000000000000000000000000000000000000000000000000000002', encodeParameterResult13);
        
        let encodeParameterResult14 = abi.encodeParameter('int16[]', [1,2]);
        assert.equal('000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002', encodeParameterResult14);
        
        let encodeParameterResult15 = abi.encodeParameter('int32', '2');
        assert.equal('0000000000000000000000000000000000000000000000000000000000000002', encodeParameterResult15);
        
        let encodeParameterResult16 = abi.encodeParameter('int32[]', [1,2]);
        assert.equal('000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002', encodeParameterResult16);
        
        let encodeParameterResult17 = abi.encodeParameter('int64', '2');
        assert.equal('0000000000000000000000000000000000000000000000000000000000000002', encodeParameterResult17);
        
        let encodeParameterResult18 = abi.encodeParameter('int64[]', [1,2]);
        assert.equal('000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002', encodeParameterResult18);
        
        let encodeParameterResult19 = abi.encodeParameter('int256', '2');
        assert.equal('0000000000000000000000000000000000000000000000000000000000000002', encodeParameterResult19);
        
        let encodeParameterResult20 = abi.encodeParameter('int256[]', [1,2]);
        assert.equal('000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002', encodeParameterResult20);
        
        let encodeParameterResult21 = abi.encodeParameter('bytes1', '0x01');
        assert.equal('0100000000000000000000000000000000000000000000000000000000000000', encodeParameterResult21);

        let encodeParameterResult22 = abi.encodeParameter('bytes2', '0x0100');
        assert.equal('0100000000000000000000000000000000000000000000000000000000000000', encodeParameterResult22);

        let encodeParameterResult23 = abi.encodeParameter('bytes3', '0x010000');
        assert.equal('0100000000000000000000000000000000000000000000000000000000000000', encodeParameterResult23);

        let encodeParameterResult24 = abi.encodeParameter('bytes4', '0x01000000');
        assert.equal('0100000000000000000000000000000000000000000000000000000000000000', encodeParameterResult24);

        let encodeParameterResult25 = abi.encodeParameter('bytes5', '0x0100000000');
        assert.equal('0100000000000000000000000000000000000000000000000000000000000000', encodeParameterResult25);
        
        let encodeParameterResult26 = abi.encodeParameter('bytes6', '0x010000000000');
        assert.equal('0100000000000000000000000000000000000000000000000000000000000000', encodeParameterResult26);
        
        let encodeParameterResult27 = abi.encodeParameter('bytes7', '0x01000000000000');
        assert.equal('0100000000000000000000000000000000000000000000000000000000000000', encodeParameterResult27);
        
        let encodeParameterResult28 = abi.encodeParameter('bytes8', '0x0100000000000000');
        assert.equal('0100000000000000000000000000000000000000000000000000000000000000', encodeParameterResult28);
        
        let encodeParameterResult29 = abi.encodeParameter('bytes9', '0x010000000000000000');
        assert.equal('0100000000000000000000000000000000000000000000000000000000000000', encodeParameterResult29);
                
        let encodeParameterResult30 = abi.encodeParameter('bytes10', '0x01000000000000000000');
        assert.equal('0100000000000000000000000000000000000000000000000000000000000000', encodeParameterResult30);
        
        let encodeParameterResult31 = abi.encodeParameter('bytes11', '0x0100000000000000000000');
        assert.equal('0100000000000000000000000000000000000000000000000000000000000000', encodeParameterResult31);
        
        let encodeParameterResult32 = abi.encodeParameter('bytes12', '0x010000000000000000000000');
        assert.equal('0100000000000000000000000000000000000000000000000000000000000000', encodeParameterResult32);
        
        let encodeParameterResult33 = abi.encodeParameter('bytes13', '0x01000000000000000000000000');
        assert.equal('0100000000000000000000000000000000000000000000000000000000000000', encodeParameterResult33);
        
        let encodeParameterResult34 = abi.encodeParameter('bytes14', '0x0100000000000000000000000000');
        assert.equal('0100000000000000000000000000000000000000000000000000000000000000', encodeParameterResult34);
        
        let encodeParameterResult35 = abi.encodeParameter('bytes15', '0x010000000000000000000000000000');
        assert.equal('0100000000000000000000000000000000000000000000000000000000000000', encodeParameterResult35);
        
        let encodeParameterResult36 = abi.encodeParameter('bytes16', '0x01000000000000000000000000000000');
        assert.equal('0100000000000000000000000000000000000000000000000000000000000000', encodeParameterResult36);
        
        let encodeParameterResult37 = abi.encodeParameter('bytes17', '0x0100000000000000000000000000000000');
        assert.equal('0100000000000000000000000000000000000000000000000000000000000000', encodeParameterResult37);
                
        let encodeParameterResult38 = abi.encodeParameter('bytes18', '0x010000000000000000000000000000000000');
        assert.equal('0100000000000000000000000000000000000000000000000000000000000000', encodeParameterResult38);
        
        let encodeParameterResult39 = abi.encodeParameter('bytes19', '0x01000000000000000000000000000000000000');
        assert.equal('0100000000000000000000000000000000000000000000000000000000000000', encodeParameterResult39);
        
        let encodeParameterResult40 = abi.encodeParameter('bytes20', '0x0100000000000000000000000000000000000000');
        assert.equal('0100000000000000000000000000000000000000000000000000000000000000', encodeParameterResult40);
        
        let encodeParameterResult41 = abi.encodeParameter('bytes21', '0x010000000000000000000000000000000000000000');
        assert.equal('0100000000000000000000000000000000000000000000000000000000000000', encodeParameterResult41);
        
        let encodeParameterResult42 = abi.encodeParameter('bytes22', '0x01000000000000000000000000000000000000000000');
        assert.equal('0100000000000000000000000000000000000000000000000000000000000000', encodeParameterResult42);
        
        let encodeParameterResult43 = abi.encodeParameter('bytes23', '0x0100000000000000000000000000000000000000000000');
        assert.equal('0100000000000000000000000000000000000000000000000000000000000000', encodeParameterResult43);

        let encodeParameterResult44 = abi.encodeParameter('bytes24', '0x010000000000000000000000000000000000000000000000');
        assert.equal('0100000000000000000000000000000000000000000000000000000000000000', encodeParameterResult44);
        
        let encodeParameterResult46 = abi.encodeParameter('bytes25', '0x01000000000000000000000000000000000000000000000000');
        assert.equal('0100000000000000000000000000000000000000000000000000000000000000', encodeParameterResult46);
        
        let encodeParameterResult47 = abi.encodeParameter('bytes26', '0x0100000000000000000000000000000000000000000000000000');
        assert.equal('0100000000000000000000000000000000000000000000000000000000000000', encodeParameterResult47);
        
        let encodeParameterResult48 = abi.encodeParameter('bytes27', '0x010000000000000000000000000000000000000000000000000000');
        assert.equal('0100000000000000000000000000000000000000000000000000000000000000', encodeParameterResult48);
        
        let encodeParameterResult49 = abi.encodeParameter('bytes28', '0x01000000000000000000000000000000000000000000000000000000');
        assert.equal('0100000000000000000000000000000000000000000000000000000000000000', encodeParameterResult49);
        
        let encodeParameterResult50 = abi.encodeParameter('bytes29', '0x0100000000000000000000000000000000000000000000000000000000');
        assert.equal('0100000000000000000000000000000000000000000000000000000000000000', encodeParameterResult50);
        
        let encodeParameterResult51 = abi.encodeParameter('bytes30', '0x010000000000000000000000000000000000000000000000000000000000');
        assert.equal('0100000000000000000000000000000000000000000000000000000000000000', encodeParameterResult51);
        
        let encodeParameterResult52 = abi.encodeParameter('bytes31', '0x01000000000000000000000000000000000000000000000000000000000000');
        assert.equal('0100000000000000000000000000000000000000000000000000000000000000', encodeParameterResult52);
        
        let encodeParameterResult53 = abi.encodeParameter('bytes32', '0x0100000000000000000000000000000000000000000000000000000000000000');
        assert.equal('0100000000000000000000000000000000000000000000000000000000000000', encodeParameterResult53);
                

        let encodeParameterResult55 = abi.encodeParameter('address[]', ['vite_010000000000000000000000000000000000000063bef3da00','vite_0200000000000000000000000000000000000000e4194eedc2']);
        assert.equal('000000000000000000000000000000000000000000000000000000000000000200000000000000000000000001000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000', encodeParameterResult55);
        
        let encodeParameterResult57 = abi.encodeParameter('tokenId[]', ['tti_01000000000000000000fb5e','tti_02000000000000000000199f']);
        assert.equal('000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002000000000000000000', encodeParameterResult57);
        
        let encodeParameterResult56 = abi.encodeParameter('gid[]', ['01000000000000000000','02000000000000000000']);
        assert.equal('000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002000000000000000000', encodeParameterResult56);
        
        let encodeParameterResult58 = abi.encodeParameter('bytes32[]', ['0x0100000000000000000000000000000000000000000000000000000000000000','0x0200000000000000000000000000000000000000000000000000000000000000']);
        assert.equal('000000000000000000000000000000000000000000000000000000000000000201000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000', encodeParameterResult58);
        
        let encodeParameterResult60 = abi.encodeParameter('string', 'foobar');
        assert.equal('0000000000000000000000000000000000000000000000000000000000000006666f6f6261720000000000000000000000000000000000000000000000000000', encodeParameterResult60);
        


        // let encodeParametersResult1 = abi.encodeParameters(['uint8[]','bytes'], [['34','43'], '0x324567ff']);
        // assert.equal('000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000022000000000000000000000000000000000000000000000000000000000000002b0000000000000000000000000000000000000000000000000000000000000004324567ff00000000000000000000000000000000000000000000000000000000', encodeParametersResult1);

        // let encodeParametersResult2 = abi.encodeParameters(['address','uint8[]'], ['vite_010000000000000000000000000000000000000063bef3da00', '[1,2]']);
        // assert.equal('00000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002', encodeParametersResult2);

        // let encodeParametersResult3 = abi.encodeParameters(["uint8[]","address"], ["[1,2]", "vite_010000000000000000000000000000000000000063bef3da00"]);
        // assert.equal("00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002", encodeParametersResult3);

        // let encodeParametersResult4 = abi.encodeParameters(["tokenId","address"], ["tti_01000000000000000000fb5e", "vite_010000000000000000000000000000000000000063bef3da00"]);
        // assert.equal("00000000000000000000000000000000000000000000010000000000000000000000000000000000000000000100000000000000000000000000000000000000", encodeParametersResult4);
    });

    it('method', function() {
        let encodeMethodResult1 =  abi.encodeMethod({'type':'function','name':'singleParam','inputs':[{'name':'param1','type':'address'}]});
        assert.equal('053f71a4', encodeMethodResult1);

        let encodeMethodResult2 =  abi.encodeMethod({'type':'function','name':'twoParams','inputs':[{'name':'param1','type':'tokenId'},{'name':'param2','type':'uint256[2]'}]});
        assert.equal('41bdf4f6', encodeMethodResult2);
    });
});