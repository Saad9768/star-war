const mapKeyForUrl = (url) => {
    if (!url) {
        return []
    }
    if (url.startsWith('/people')) {
        return [{
            key: 'height',
            val: 'Height'
        },
        {
            key: 'birth_year',
            val: 'BirthYear'
        }]
    } else if (url.startsWith('/planets')) {
        return [{
            key: 'diameter',
            val: 'Diameter'
        }, {
            key: 'rotation_period',
            val: 'Rotation Period'
        }]
    } else if (url.startsWith('/starships')) {
        return [{
            key: 'passengers',
            val: 'Passengers'
        }, {
            key: 'cargo_capacity',
            val: 'Cargo Capacity'
        }]
    }
    return [];
}

export { mapKeyForUrl }