const projectsDb = []

const getAll = () => {
    return projectsDb
}

const create = (project) => {
    projectsDb.push(project)
}

const getOne = (projectId) => {
    const index = projectsDb.findIndex(project => project.id === projectId)

    return projectsDb[index]
}

const update = (projectId, projectUpdated) => {
    const index = projectsDb.findIndex(project => project.id === projectId)

    projectsDb[index] = projectUpdated
}

const remove = (projectId) => {
    const index = projectsDb.findIndex(project => project.id === projectId)
  
    if (index > -1) {
        projectsDb.splice(index, 1)
    }
}

export default {
    projectsDb,
    getAll,
    create,
    getOne,
    update,
    remove
}