import dotenv from 'dotenv'
import commander from "../utils/commander.js";

const {mode} = commander.opts()

dotenv.config({
  path: mode === 'development' ? './.env.development' : './.env.production'
})

export default dotenv