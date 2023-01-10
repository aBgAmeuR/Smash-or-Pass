class InputVerif {
    InputVerif(value) {;
        const regex = /[^A-Za-z0-9 ]+/g;
        if (regex.test(value)) {
            return false;
        } else {
            return true;
        }
    }
}

module.exports = InputVerif;