module.exports = (crud) => {
  return {
    getAll: crud.getAll,
    create: crud.create,
    getByName: crud.getByName,
    deleteAll: crud.deleteAll,
    deleteByName: crud.deleteByName,
    updateByName: crud.updateByName,
  };
};
