import { exec } from "child_process"
// eslint-disable-next-line
import axios from "axios"
// eslint-disable-next-line
import * as cheerio from "cheerio"
export default (handler) => {
    handler.reg({
        cmd: ['-'],
        tags: 'owner',
        desc: 'Eval command',
        isOwner: true,
        noPrefix: true,
        // eslint-disable-next-line
        run: async (m, { util, db, func, cmds, sock, scraper }) => {
            let text = m.text.replace("×", ".toString()")
            // eslint-disable-next-line
            function usr(sender) {
                return db.users[sender]
            }

            // eslint-disable-next-line
            function gc(sender) {
                return db.groups[sender]


            }
            // eslint-disable-next-line
            function add(module) {
                return import(module)
            }
            let evalCmd
            try {
                evalCmd = /await/i.test(text)
                    ? eval("(async () => { " + text + " })()")
                    : eval(text)
            } catch (e) {
                m.reply(util.format(e))
            }

            (async () => {
                try {
                    const result = await evalCmd
                    m.reply(util.format(result))
                } catch (err) {
                    m.reply(util.format(err))
                }
            })()

        }
    })

    handler.reg({
        cmd: ['$'],
        tags: 'owner',
        desc: 'Shell exec',
        isOwner: true,
        noPrefix: true,
        run: async (m, { util }) => {
            try {
                await m.reply("Processing...")

                exec(m.text, (err, stdout, stderr) => {
                    if (err) {
                        return m.reply(
                            `Error: ${err.message}\nExit Code: ${err.code}\nSignal: ${err.signal}\n${stderr}`
                        )
                    }
                    if (stdout) {
                        return m.reply(util.format(stdout.replace("amiruldev/hxr", "sherly/amelia")))
                    }
                })
            } catch (e) {
                m.reply(util.format(e))
            }
        }
    })

}