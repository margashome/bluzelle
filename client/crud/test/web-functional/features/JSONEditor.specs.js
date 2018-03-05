import {start, setData} from "../emulator/Emulator";

describe('JSON Editor functionality.', () => {

    beforeEach(() => {

        start();
        setData({});

        browser.url('http://localhost:8200/?test');

        browser.waitForExist('button=Go');
        browser.element('button=Go').click();

        browser.waitForExist('.glyphicon-plus');

        browser.element('.glyphicon-plus').click();
        browser.keys(['json', 'Enter']);

        browser.element('button*=JSON Data').click();

    });

    it('should be able to edit json directly', () => {

        browser.moveToObject('span*=(0 entries)');
        browser.element('.glyphicon-pencil').click();

        browser.setValue('input', '[1, "crazy text", 3, 4]');
        browser.submitForm('input');

        browser.waitForExist('span*=crazy text');

        const spans = browser.elements('span*=crazy text').value;
        const last = spans[spans.length - 1];

        last.click();

        browser.setValue('input', '{ "mykey": 123 }');
        browser.submitForm('input');

        browser.waitForExist('span*=mykey');

    });

    it('should have a working plus button for objects', () => {

        browser.moveToObject('span*=(0 entries)');

        const plus = browser.elements('.glyphicon-plus').value[1];

        plus.click();

        browser.keys(['myKey', 'Enter', '132', 'Enter']);

        browser.waitForExist('span*=myKey');
        browser.waitForExist('span*=132');

    });

    it('should have a working delete button for objects', () => {

        browser.moveToObject('span*=(0 entries)');

        browser.click('.glyphicon-pencil');

        browser.keys(['{ "keyA": 123, "keyB": "whence" }', 'Enter']);

        browser.moveToObject('span*=123');

        browser.elements('.glyphicon-remove').value[1].click();

        // Reverse flag is true, we are waiting for it to not exist
        browser.waitForExist('span*=123', 500, true);

    });


    it('should have a working plus button for arrays', () => {

        browser.moveToObject('span*=(0 entries)');

        browser.click('.glyphicon-pencil');

        browser.keys(['[]', 'Enter']);

        browser.elements('.glyphicon-plus').value[1].click();

        browser.keys(['999', 'Enter']);

        browser.waitForExist('span*=999');

    });

    it('should have a working delete button for arrays', () => {

        browser.moveToObject('span*=(0 entries)');

        browser.click('.glyphicon-pencil');

        browser.keys(['[654]', 'Enter']);

        browser.moveToObject('span*=654');

        browser.elements('.glyphicon-remove').value[1].click();

        // Reverse flag is true, we are waiting for it to not exist
        browser.waitForExist('span*=654', 500, true);

    });

});