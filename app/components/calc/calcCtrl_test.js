'use strict';

describe('calc module', function () {
    beforeEach(module('calc'));

    it('validate calculation', inject(function ($controller) {
            var input = JSON.parse('[ { "expr":"375*705/550+524-416*57+405", "answer":"-26772.51" }, { "expr":"124+224*571-670/441-61", "answer":"155025.37" }, { "expr":"425+1001*226*443/330", "answer":"313011.60" }, { "expr":"734/767*723+135-225-427-271", "answer":"-116.04" }, { "expr":"671-302-663*367", "answer":"-321276" }, { "expr":"707-316-474*33/631*152-12", "answer":"3664.17" }, { "expr":"532-564", "answer":"-32" }, { "expr":"643/732+247/672", "answer":"1.21" }, { "expr":"706/210*502+706", "answer":"2770.72" }, { "expr":"1015*742+255/274", "answer":"756172.73" }, { "expr":"735-14*44-747", "answer":"-672" }, { "expr":"311*1007+202-230", "answer":"313551" }, { "expr":"151+575-525*660+127*271", "answer":"-377253" }, { "expr":"321*456*545+2+264/364", "answer":"125752010.57" }, { "expr":"1004-572/557", "answer":"1002.76" } ]');
            var scope = {};
            var calcCtrl = $controller('CalcCtrl', {$scope: scope});

            for (var i = 0; i < input.length; i++) {
                expect(scope.calculate(input[i].expr)).toEqual(input[i].answer);
            }
        }
    ));
});

/*function () {
    var input = JSON.parse('[ { "expr":"375*705/550+524-416*57+405", "answer":"-26772.51" }, { "expr":"124+224*571-670/441-61", "answer":"155025.37" }, { "expr":"425+1001*226*443/330", "answer":"313011.60" }, { "expr":"734/767*723+135-225-427-271", "answer":"-116.04" }, { "expr":"671-302-663*367", "answer":"-321276" }, { "expr":"707-316-474*33/631*152-12", "answer":"3664.17" }, { "expr":"532-564", "answer":"-32" }, { "expr":"643/732+247/672", "answer":"1.21" }, { "expr":"706/210*502+706", "answer":"2770.72" }, { "expr":"1015*742+255/274", "answer":"756172.73" }, { "expr":"735-14*44-747", "answer":"-672" }, { "expr":"311*1007+202-230", "answer":"313551" }, { "expr":"151+575-525*660+127*271", "answer":"-377253" }, { "expr":"321*456*545+2+264/364", "answer":"125752010.57" }, { "expr":"1004-572/557", "answer":"1002.76" } ]');
    var calcCtrl = $controller.get('calcCtrl', {$scope: $scope});

    for (var i = 0; i < input.length; i++) {
       expect($scope.calculate(input[i].expr)).toEqual(input[i].answer);
    }
});
});*/