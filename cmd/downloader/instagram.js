import axios from 'axios'
export default (handler) => {
    handler.reg({
        cmd: ['instagram', 'ig', 'igdl'],
        tags: 'downloader',
        desc: 'Instagram downloader (support reel/story)',
        isLimit: true,
        run: async (m, { sock, func }) => {
            if (!m.text) return m.reply('Silahkan masukan link instagram (support reel/story)')
            const scrape = await func.load("@amiruldev/ig.js")
            const ok = await scrape(axios, m.text)
            if (!ok.status) return m.reply('Permintaan tidak dapat diproses!!')
            m.react("⏱️")
            await Promise.all(ok.data.map(it => sock.sendMedia(m.from, it.url, m)))
            m.react("✅")
        }
    })
}