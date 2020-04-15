const db = require('../data/db-config');


module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove,
    addStep
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


// STRETCH

function addStep(step, scheme_id) {
    console.log('this is the new step', step)
    const newStep = { ...step, "scheme_id": scheme_id };

    return db('steps')
        .insert(newStep, 'id')
        .then(id => {
            return db('steps')
                .select('*')
                .where({ id: id[0] })
        })
}





