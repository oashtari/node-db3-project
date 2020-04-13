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


// -   `findSteps(id)`:
// -   Expects a scheme `id`.
// -   Resolves to an array of all correctly ordered step for the given scheme: 
// `[ { id: 17, scheme_name: 'Find the Holy Grail', step_number: 1, instructions: 'quest'},
// { id: 18, scheme_name: 'Find the Holy Grail', step_number: 2, instructions: '...and quest'}, etc. ]`.
// -   This array should include the `scheme_name` _not_ the `scheme_id`.

function findSteps(id) {
    return db('schemes')
        .join('steps', 'schemes.id', '=', 'steps.scheme_id')
        .select('schemes.scheme_name', 'steps.step_number', 'steps.instructions')
        .where({ 'schemes.id': id })
        .orderBy(['scheme_name', { column: 'step_number', order: 'asc' }])
}



function add(scheme) {
    db('schemes')
        .insert(scheme)
        .then(ids => {
            return findById(ids[0])
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





