const projectsDb = ["projeto"]

const getAll = () => {
    return projectsDb
}

const create = (project) => {
    projectsDb.push(project)
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
    update,
    remove
}