/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
'use strict';



// Import modules
import members from "./members";


// Declaration
export declare interface Profile {
    member_id: string,
    name: string,
    kana?: string,
    age?: number,
    birthday?: string,
    units?: Array<string>
}


// Fixture
const fixture: Array<Profile> = [{
    member_id: members[0].member_id,
    name: "高坂 穂乃果",
    kana: "こうさか ほのか",
    age: 16,
    birthday: "08/03",
    units: [
        "2e59c9fe-0ae2-4f6b-8d01-cc70ca6c48f9",
        "65eb275f-a370-476a-bbe3-c0ea50e8e5d9"
    ]
}, {
    member_id: members[1].member_id,
    name: "南 ことり",
    kana: "みなみ ことり",
    age: 16,
    birthday: "09/12",
    units: [
        "2e59c9fe-0ae2-4f6b-8d01-cc70ca6c48f9",
        "65eb275f-a370-476a-bbe3-c0ea50e8e5d9"
    ]
}, {
    member_id: members[2].member_id,
    name: "園田 海未",
    kana: "そのだ うみ",
    age: 16,
    birthday: "03/15",
    units: [
        "2e59c9fe-0ae2-4f6b-8d01-cc70ca6c48f9",
        "8afc2124-77ea-4729-9513-ad9d1171553a"
    ]
}, {
    member_id: members[3].member_id,
    name: "西木野 真姫",
    kana: "にしきの まき",
    age: 15,
    birthday: "04/19",
    units: [
        "2e59c9fe-0ae2-4f6b-8d01-cc70ca6c48f9",
        "6d31b6ab-d1da-4031-aa57-0a85810b3a63"
    ]
}, {
    member_id: members[4].member_id,
    name: "星空 凛",
    kana: "ほしぞら りん",
    age: 15,
    birthday: "11/01",
    units: [
        "2e59c9fe-0ae2-4f6b-8d01-cc70ca6c48f9",
        "8afc2124-77ea-4729-9513-ad9d1171553a"
    ]
}, {
    member_id: members[5].member_id,
    name: "小泉 花陽",
    kana: "こいずみ はなよ",
    age: 15,
    birthday: "01/17",
    units: [
        "2e59c9fe-0ae2-4f6b-8d01-cc70ca6c48f9",
        "65eb275f-a370-476a-bbe3-c0ea50e8e5d9"
    ]
}, {
    member_id: members[6].member_id,
    name: "矢澤 にこ",
    kana: "やざわ にこ",
    age: 17,
    birthday: "07/22",
    units: [
        "2e59c9fe-0ae2-4f6b-8d01-cc70ca6c48f9",
        "6d31b6ab-d1da-4031-aa57-0a85810b3a63"
    ]
}, {
    member_id: members[7].member_id,
    name: "東條 希",
    kana: "とうじょう のぞみ",
    age: 17,
    birthday: "06/09",
    units: [
        "2e59c9fe-0ae2-4f6b-8d01-cc70ca6c48f9",
        "8afc2124-77ea-4729-9513-ad9d1171553a"
    ]
}, {
    member_id: members[8].member_id,
    name: "絢瀬 絵里",
    kana: "あやせ えり",
    age: 17,
    birthday: "10/21",
    units: [
        "2e59c9fe-0ae2-4f6b-8d01-cc70ca6c48f9",
        "6d31b6ab-d1da-4031-aa57-0a85810b3a63"
    ]
}];


// Export fixture
export default fixture;



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */

