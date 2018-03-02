import {start, setData} from "../emulator/Emulator";
import {findComponentsTest} from "react-functional-test";

describe('KeyList functionality', () => {

    beforeEach(() => {

        const data = {
            textA: [1, 72, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100, 44, 32, 116, 104, 105, 115, 32, 105, 115, 32, 115, 111, 109, 101, 32, 112, 108, 97, 105, 110, 32, 116, 101, 120, 116, 46],
            textB: [1, 72, 99, 108, 108, 111, 32, 119, 111, 114, 108, 100, 44, 32, 116, 104, 105, 115, 32, 105, 115, 32, 115, 111, 109, 101, 32, 112, 108, 97, 105, 110, 32, 116, 101, 120, 116, 46],
            objC: [0, 1, 2, 3, 4, 111, 114, 108, 100, 44, 32, 116, 104, 105, 115, 32, 105, 115, 32, 115, 111, 109, 101, 32, 112, 108, 97, 105, 110, 32, 116, 101, 120, 116, 46]
        };

        start();
        setData(data);

        browser.url('http://localhost:8200/?test');

        browser.waitForExist('button=Go');
        browser.element('button=Go').click();

        browser.waitUntil(() => findComponentsTest('KeyList').length, 2000);

    });

    it('should render the keys in the database on start', () => {

        const comps = findComponentsTest('KeyListItem');

        expect(comps.some(comp => comp.props.keyname === 'textA'));
        expect(comps.some(comp => comp.props.keyname === 'textB'));
        expect(comps.some(comp => comp.props.keyname === 'objC'));

    });

    it('should render keys in alphabetical order', () => {

        const comps = findComponentsTest('KeyListItem');

        const textAInd = comps.find(comp => comp.props.keyname === 'textA');
        const textBInd = comps.find(comp => comp.props.keyname === 'textB');
        const objCInd = comps.find(comp => comp.props.keyname === 'objC');

        expect(textAInd < textBInd);
        expect(objCInd < textAInd);

    });

});