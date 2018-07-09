/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
"use strict";



// Import modules
import config from "./config/default";
import members from "./fixtures/members";
import profiles from "./fixtures/profiles";
import units from "./fixtures/units";


// Varaibles
console.log(config);
const Spanner = require("@google-cloud/spanner");
const client = new Spanner({
    projectId: config.project_id
});
const instance = client.instance(config.instance_id);
const database = instance.database(config.database_id);


// Insert fixture data
(async function () {
    const member_table = database.table("members");
    await member_table.insert(members);

    const profile_table = database.table("profiles");
    await profile_table.insert(profiles);

    const unit_table = database.table("units");
    await unit_table.insert(units);
})();



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
