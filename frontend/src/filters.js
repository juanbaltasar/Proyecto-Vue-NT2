export function buscarPorTitulo (list, keyword) {
    const search = keyword.trim().toLowerCase();
    if (!search.length) return list;
    return list.filter(item => item.nombre.toLowerCase().indexOf(search) > -1);
}