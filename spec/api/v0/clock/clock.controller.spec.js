var proxyquire = require('proxyquire');
var Big = require('big.js');

describe('When calls getAngle', () => {
    var controller;
    var stubbedExpressValidator = {};
    var REQ, RES, NEXT;

    beforeEach(() => {
        REQ = {
            params : {}
        };

        RES = {
            json : jasmine.createSpy()
        };

        RES.status = jasmine.createSpy().and.callFake((status) => {
            return RES;
        });

        NEXT = jasmine.createSpy();

        mockValidator(true, null);
    });

    it('the angle at 12:15 should be 90°', () => {
        initController();
        testAngle(12, 15, 90);
    });

    it('the angle at 12:45 should be 90°', () => {
        initController();
        testAngle(12, 45, 90);
    });

    it('the angle at 3:00 should be 90°', () => {
        initController();
        testAngle(3, 0, 90);
    });

    it('the angle at 0:29 should be same angle at 0:31', () => {
        initController();
        testAngle(0, 29, 174);
        testAngle(0, 31, 174);
    });

    it('should return error status when error', () => {
        mockValidator(false, ['error']);
        initController();

        controller.getAngle(REQ, RES, NEXT);

        expect(RES.status).toHaveBeenCalledWith(422);
        expect(RES.json).toHaveBeenCalledWith({
            errors : ['error']
        });
    });

    function initController() {
        controller = proxyquire('../../../../api/v0/clock/clock.controller.js', stubbedExpressValidator);
    }

    function mockValidator(isEmpty, errorsArray) {
        stubbedExpressValidator = {
            'express-validator' : {
                validationResult : (req) => {
                    return {
                        isEmpty : () => {
                            return isEmpty;
                        },
                        array : () => {
                            return errorsArray;
                        }
                    }
                }
            }
        };
    }

    function testAngle(hour, minute, expectedAngle) {
        REQ.params = {
            hour : hour,
            minute : minute
        };

        var angle = controller.getAngle(REQ, RES, NEXT);

        expect(RES.json).toHaveBeenCalledWith({
            angle: new Big(expectedAngle)
        });
    }
});