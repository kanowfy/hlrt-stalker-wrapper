const utils = require("./utils");

async function stalker(req) {
    const attrNum = req.attrNum;
    const attributes = [];
    const body = await utils.fetchContent(req.url);
    for (let i = 0; i < attrNum; i++) {
        let stripped = body;
        const rule = {
            startContext: parseContext(req["start" + i], true),
            endContext: parseContext(req["end" + i], false)
        };

        for (let cmd of rule.startContext) {
            stripped = stripped.substring(stripped.indexOf(cmd) + cmd.length);
        }

        attributes.push(stripped.substring(0, stripped.indexOf(rule.endContext[0])));
    }

    return {
        attributes: attributes
    };
}

function parseContext(context, isStart) {
    const commandParts = context.split(',');
    const commands = [];
    const startDelim = isStart ? "SkipTo(" : "BackTo(";

    for (let cmd of commandParts) {
        commands.push(utils.extractData(cmd, startDelim, ")"));
    }

    return commands;
}

module.exports = stalker;
