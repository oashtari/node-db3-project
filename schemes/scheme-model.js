const db = require('../data/db-config');


module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}

function find() {
    return db('schemes');  //
}

function findById(id) {
    return db('schemes')
        .where({ id })
        .first()
}

function findSteps(id) {
    return db('schemes')
        .join('steps', 'schemes.id', '=', 'steps.scheme_id')
        .select('schemes.scheme_name', 'steps.step_number', 'steps.instructions')
        .where({ 'schemes.id': id })
        .orderBy(['scheme_name', { column: 'step_number', order: 'asc' }])
}

// function findSteps(id) {
//     db
//         .select('steps.id', 'scheme_name', 'step_number', 'instructions')
//         .from('schemes')
//         .innerJoin('steps', 'steps.scheme_id', 'schemes.id')
//         .where('schemes.id', id)
//         .orderBy('steps.step_number')
// }

function add(scheme) {
    return db('schemes')
        .insert(scheme, 'id')
        .then(id => {
            return findById(id[0])
        })
}


function update(changes, id) {
    return db('schemes')
        .where({ id })
        .update(changes, 'id')
        .then(() => { // if you want to return the item, this is not needed
            return findById(id)
        })
}

function remove(id) {
    return db('schemes')
        .where({ id })
        .del();
}






