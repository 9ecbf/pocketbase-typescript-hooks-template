/// <reference path="../types/pocketbase.d.ts" />

migrate((db) => {
    const collection = new Collection({
        name: 'codes',
        type: 'base',
    });

    collection.schema.addField(
        new SchemaField({
            name: 'email',
            type: 'email',
            required: true,
        }),
    );

    collection.schema.addField(
        new SchemaField({
            name: 'code',
            type: 'text',
            required: true,
        }),
    );

    collection.schema.addField(
        new SchemaField({
            name: 'type',
            type: 'select',
            required: true,
            options: {
                maxSelect: 1,
                values: ['VERIFY_EMAIL', 'RESET_PASSWORD'],
            },
        }),
    );

    return new Dao(db).saveCollection(collection);
});
