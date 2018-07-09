/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
"use strict";



// Import modules
import expect = require("expect.js");
import uuid = require("uuid");
import config from "./config/default";
import members from "./fixtures/members";
import profiles from "./fixtures/profiles";


// Varaibles
const Spanner = require("@google-cloud/spanner");
const client = new Spanner({
    projectId: config.project_id
});
const instance = client.instance(config.instance_id);
const database = instance.database(config.database_id);


// After
after(async () => {
    await database.close();
});


describe("Test of Cloud Spanner", () => {
    describe("database", () => {
        describe("run", () => {
            it("Should get all members", async () => {
                const query = {
                    sql: "SELECT * FROM members",
                    json: true
                };

                const result = await database.run(query);
                expect(result[0]).to.have.length(9);
                expect(result[0]).to.eql(members);
            });

            it("Should join tables", async () => {
                const sql = "SELECT * FROM members "
                    + "LEFT JOIN profiles ON members.member_id = profiles.member_id "
                    + "WHERE members.member_id = @member_id";
                const query = {
                    sql: sql,
                    params: {
                        member_id: members[0].member_id
                    },
                    json: true
                };

                const result = await database.run(query);
                expect(result[0]).to.have.length(1);
                expect(result[0][0]).to.eql(Object.assign({}, members[0], profiles[0]));
            });
        });

        describe("transaction", () => {
            let unit_id = uuid.v4();
            const unit_table = database.table("units");
            const data = {
                unit_id: unit_id,
                name: "Aqours"
            };

            beforeEach(async () => {
                await unit_table.upsert(data);
            });

            it("Should read and update data", async () => {
                const name = "CYaRon!";

                await new Promise((resolve) => {
                    database.runTransaction(async (error: Error, transaction: any) => {
                        const insert = await transaction.read("units", {
                            keys: [unit_id],
                            columns: ["unit_id", "name"],
                            json: true
                        });
                        expect(insert[0]).to.have.length(1);
                        expect(insert[0][0]).to.eql(data);

                        const run = await transaction.run({
                            sql: "SELECT * FROM units WHERE unit_id = @unit_id",
                            params: {
                                unit_id: unit_id
                            }
                        });
                        expect(run[0]).to.have.length(1);
                        expect(run[0][0].toJSON()).to.eql(data);

                        await transaction.update("units", {
                            unit_id: unit_id,
                            name: name
                        });
                        await transaction.commit();

                        resolve();
                    });
                });

                const result = await unit_table.read({
                    keys: [unit_id],
                    columns: ["unit_id", "name"],
                    json: true
                });
                expect(result[0]).to.have.length(1);
                expect(result[0][0].unit_id).to.be(unit_id);
                expect(result[0][0].name).to.be(name);
            });

            it("Should rollback data", async () => {
                await new Promise((resolve) => {
                    database.runTransaction(async (error: Error, transaction: any) => {
                        const insert = await transaction.read("units", {
                            keys: [unit_id],
                            columns: ["unit_id", "name"],
                            json: true
                        });
                        expect(insert[0]).to.have.length(1);
                        expect(insert[0][0]).to.eql(data);

                        await transaction.update("units", {
                            unit_id: unit_id,
                            name: "CYaRon!"
                        });
                        await transaction.rollback();

                        resolve();
                    });
                });

                const result = await unit_table.read({
                    keys: [unit_id],
                    columns: ["unit_id", "name"],
                    json: true
                });
                expect(result[0]).to.have.length(1);
                expect(result[0][0]).to.eql(data);
            });

            afterEach(async () => {
                await unit_table.deleteRows(unit_id);
            });
        });
    });

    describe("table", () => {
        describe("read", () => {
            it("Should get all members", async () => {
                const member_table = database.table("members");

                const result = await member_table.read({
                    keySet: {
                        all: true,
                    },
                    columns: ["member_id", "email", "password"],
                    json: true
                });
                expect(result[0]).to.have.length(9);
                expect(result[0]).to.eql(members);
            });

            it("Should get member by key", async () => {
                const member_table = database.table("members");

                const result = await member_table.read({
                    keys: [members[0].member_id],
                    columns: ["member_id", "email", "password"],
                    json: true
                });
                expect(result[0]).to.have.length(1);
                expect(result[0][0]).to.eql(members[0]);
            });
        });

        describe("insert", () => {
            let unit_id = uuid.v4();
            it("Should insert unit", async () => {
                const unit_table = database.table("units");
                const data = {
                    unit_id: unit_id,
                    name: "Aqours"
                };
                const not_found = await unit_table.read({
                    keys: [unit_id],
                    columns: ["unit_id", "name"],
                    json: true
                });
                expect(not_found[0]).to.have.length(0);

                await unit_table.insert(data);
                const result = await unit_table.read({
                    keys: [unit_id],
                    columns: ["unit_id", "name"],
                    json: true
                });
                expect(result[0]).to.have.length(1);
                expect(result[0][0]).to.eql(data);
            });

            after(async () => {
                const unit_table = database.table("units");
                await unit_table.deleteRows(unit_id);
            });
        });

        describe("update", () => {
            let unit_id = uuid.v4();
            it("Should update unit", async () => {
                const unit_table = database.table("units");
                const before_data = {
                    unit_id: unit_id,
                    name: "Aqours"
                };
                const after_data = {
                    unit_id: unit_id,
                    name: "CYaRon!"
                };

                await unit_table.insert(before_data);
                const insert = await unit_table.read({
                    keys: [unit_id],
                    columns: ["unit_id", "name"],
                    json: true
                });
                expect(insert[0]).to.have.length(1);
                expect(insert[0][0]).to.eql(before_data);

                await unit_table.update(after_data);
                const result = await unit_table.read({
                    keys: [unit_id],
                    columns: ["unit_id", "name"],
                    json: true
                });
                expect(result[0]).to.have.length(1);
                expect(result[0][0]).to.eql(after_data);
            });

            after(async () => {
                const unit_table = database.table("units");
                await unit_table.deleteRows(unit_id);
            });
        });

        describe("delete", () => {
            it("Should delete unit", async () => {
                const unit_table = database.table("units");
                const data = {
                    unit_id: uuid.v4(),
                    name: "Aqours"
                };

                await unit_table.insert(data);
                const insert = await unit_table.read({
                    keys: [data.unit_id],
                    columns: ["unit_id", "name"],
                    json: true
                });
                expect(insert[0]).to.have.length(1);
                expect(insert[0][0]).to.eql(data);

                await unit_table.deleteRows(data.unit_id);
                const result = await unit_table.read({
                    keys: [data.unit_id],
                    columns: ["unit_id", "name"],
                    json: true
                });
                expect(result[0]).to.have.length(0);
            });
        });
    });
});



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
