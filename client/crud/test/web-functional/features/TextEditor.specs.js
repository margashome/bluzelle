import {start, setData} from "../emulator/Emulator";

describe('Text Editor functionality.', () => {

    beforeEach(() => {

        const data = {
            text: [1, 72, 101, 108, 108, 111]
        };

        start();
        setData(data);

        browser.url('http://localhost:8200/?test');

        browser.waitForExist('button=Go');
        browser.element('button=Go').click();

        browser.waitForExist('button*=text', 1000);

    });

    it('should be able to type into the text area and have it persist', () => {

        execute() {
            verifyDo();
            undo(); // <== defined here
            verifyUndo();
            do(); // <== defined here
            verifyDo();
        }


        checkUndo({
            verifyDo: () => {

            },
            verifyUndo: () => {

            }
        });


        browser.element('button*=text').click();

        browser.waitForExist('textarea');
        browser.element('textarea').click();

        browser.keys(['My additional text here']);

        // Defocus
        browser.element('img').click();

        // Reselect
        browser.element('button*=text').click();
        browser.element('button*=text').click();

        browser.waitForExist('textarea*=My additional text here');

    });


    // TODO: undo/redo testing
    // TODO: saving testing
    // TODO: consistency across browsers

});