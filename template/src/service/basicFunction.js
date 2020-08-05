exports.buildQuery = (keys, query) => {
    let limit = query.limit ? parseInt(query.limit) : query.limit
    delete query.limit;
    let offset = query.offset ? parseInt(query.offset) : query.offset
    delete query.offset;
    let orderBy = query.orderBy
    delete query.orderBy
    let orderByList = orderBy ? orderBy.split(',') : ['createdAt:desc']
    if(orderByList) {
        orderBy = {}
        for (const ob of orderByList) {
            let obSp = ob.split(':')
            if(obSp.length == 2 && new RegExp(/^asc$|^desc$|^1$|^-1$/).test(obSp[1])){
                orderBy = { ...orderBy, [obSp[0]]: obSp[1] }
            }
        }
    }
    let fields = query.fields ? query.fields.replace(/,/g," ") : ""
    delete query.fields;
    for (const key of keys) {
        if(query[key]) query[key] = new RegExp(`${query[key]}`, "i");
    }
    return { query, offset, limit, fields, orderBy };
}
