import prisma from '../mySQL/db.config.js';

const create = async ({ model_name, data }) => {
    const data_saved = await prisma?.[model_name].create({
        data
    })

    return data_saved;
}

const find_by_id = async ({ model_name, id }) => {
    const item = await prisma?.[model_name].findUnique({
        where: { id: Number(id) }
    });

    return item;
}

const get_all = async ({ model_name }) => {
    // const items = await prisma?.[model_name]?.findMany({ where: {} });
    const items = await prisma?.['admin']?.findMany();

    return items;
}

const find_all_by_id = async ({ model_name, id }) => {
    const items = await prisma?.[model_name].findMany({
        where: { id: Number(id) }
    });

    return items;
}

const find_all_by_keys = async ({ model_name, keys_values_object }) => {
    const items = await prisma?.[model_name].findMany({
        where: { keys_values_object }
    });

    return items;
}

const find_all_by_key = async ({ model_name, key, value }) => {
    let items = await prisma?.[model_name].findMany({});
    items = items.find(item => item[key] == value)

    return items;
}

const update_by_id = async ({ model_name, id, data }) => {
    const updated_item = await prisma?.[model_name].update({
        where: { id: Number(id) }, data
    });

    return updated_item;
}

const delete_by_id = async ({ model_name, id }) => {
    const deleted_item = await prisma?.[model_name].delete({
        where: { id: Number(id) }
    });

    return deleted_item;
}

const find_by_key = async ({ model_name, key, value }) => {
    let item = await prisma?.[model_name]?.findUnique({ where: { [key]: value } })
    return item
}

const update_by_key = async ({ model_name, key, value }) => {
    let updated_item = await prisma?.[model_name].update({
        where: { [key]: value }, data
    });

    return updated_item;
}

const delete_by_key = async () => {
    let deleted_item, item, items = await prisma?.[model_name].findMany({});
    item = items.find(item => item[key] == value);

    deleted_item = await prisma?.[model_name].delete({
        where: { id: item?.id }, data
    });

    return deleted_item;
}

export {
    create,
    find_by_id,
    get_all,
    find_all_by_id,
    find_all_by_keys,
    find_all_by_key,
    update_by_id,
    delete_by_id,
    find_by_key,
    update_by_key,
    delete_by_key
}