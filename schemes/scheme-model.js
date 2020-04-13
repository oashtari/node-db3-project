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

// -   `add(scheme)`:
// -   Expects a scheme object.
// -   Inserts scheme into the database.
// -   Resolves to the newly inserted scheme, including `id`.

function update(id, changes) {
    return db('users')
        .where({ id })
        .update(changes)
        .then(() => { // if you want to return the item, this is not needed
            return findById(id)
        })
}

// -   `update(changes, id)`:
// -   Expects a changes object and an `id`.
// -   Updates the scheme with the given id.
// -   Resolves to the newly updated scheme object.

function remove(id) {

}

// -   `remove(id)`:
// -   Removes the scheme object with the provided id.
// -   Resolves to the removed scheme
// -   Resolves to `null` on an invalid id.
// -   (Hint: Only worry about removing the `scheme`. The database is configured to automatically remove all associated steps.)





