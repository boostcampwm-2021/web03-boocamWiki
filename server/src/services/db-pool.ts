export default {
    pool : undefined,
    async conn(){
        return await this.pool?.getConnection()
    }
}