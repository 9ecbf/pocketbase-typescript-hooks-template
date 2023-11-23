/// <reference path="../types/pocketbase.d.ts" />

migrate((db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId('_pb_users_auth_');

    collection.schema.addField(
        new SchemaField({
            name: 'phoneNumber',
            type: 'text',
            required: true,
            options: {
                pattern: '^(\\+?84|0)\\d{9,10}',
            },
        }),
    );

    collection.schema.addField(
        new SchemaField({
            name: 'subscription',
            type: 'select',
            required: true,
            options: {
                maxSelect: 1,
                values: ['FREE', 'PREMIUM'],
            },
        }),
    );

    collection.schema.addField(
        new SchemaField({
            name: 'fullName',
            type: 'text',
            required: true,
            options: {
                min: 2,
                max: 50,
                pattern: '\\w+(\\s+\\w+)*',
            },
        }),
    );

    collection.schema.addField(
        new SchemaField({
            name: 'dateOfBirth',
            type: 'date',
        }),
    );

    collection.schema.addField(
        new SchemaField({
            name: 'activated',
            type: 'bool',
        }),
    );

    return dao.saveCollection(collection);
});
