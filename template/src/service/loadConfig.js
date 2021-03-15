exports.init = () => {
    env = {}
    for (const key in process.env) {
        try {
            env[key] = JSON.parse(process.env[key])
        } catch (error) {
            env[key] = process.env[key]
        }
    }
}