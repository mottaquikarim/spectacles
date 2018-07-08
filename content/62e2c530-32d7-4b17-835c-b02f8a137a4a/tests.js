/* 
 * FILENAME:    tests.js
 * DESC:        write any tests that much be asserted for this problem to
 *              be considered successfully completed
 * TEST RUNNER: mocha/chai.js
 */
    
// TEST 22
describe('1. newShoppingListItem', () => {
    it('should return an object with item and price attributes', () => {
        const shoppingListItem = newShoppingListItem('test', 1)
        chai.assert.equal(shoppingListItem.item, 'test');
        chai.assert.equal(shoppingListItem.price, 1);
    });
});

// TEST
describe('2. addToShoppingList', () => {

    it('should return a list', () => {
        const newList = addToShoppingList({
            'item': 'test',
            'price': 1
        });
        chai.assert.equal(newList.length, 1)
    });

    it('should have one item that is a shopping list object', () => {
        const newList = addToShoppingList({
            'item': 'test',
            'price': 1
        });
        chai.assert.equal(newList[0].item, 'test');
        chai.assert.equal(newList[0].price, 1);
    })
});


// TEST
describe('3. removeFromShoppingList', () => {
    it('should remove from the end of the list', () => {
        let list = addToShoppingList({
            'item': 'test',
            'price': 1
        });
        list = addToShoppingList({
            'item': 'test2',
            'price': 2
        }, list);

        // actually test function now
        list = removeFromShoppingList(list);

        chai.assert.equal(list.length, 1)
        // asert only item in list is 'test' with price 1
        chai.assert.equal(list[0].item, 'test')
        chai.assert.equal(list[0].price, 1)
    })
});


// TEST
describe('4. removeFirstItem', () => {
    it('should remove from the end of the list', () => {
        let list = addToShoppingList({
            'item': 'test',
            'price': 1
        });
        list = addToShoppingList({
            'item': 'test2',
            'price': 2
        }, list);
        list = removeFirstItem(list);

        chai.assert.equal(list.length, 1)
        // asert only item in list is 'test2' with price 2
        chai.assert.equal(list[0].item, 'test2')
        chai.assert.equal(list[0].price, 2)
    })
});


// TEST
describe('5. removeNthItem', () => {
    it('should remove i-th item from list', () => {
        let list = addToShoppingList({
            'item': 'test',
            'price': 1
        });
        list = addToShoppingList({
            'item': 'test2',
            'price': 2
        }, list);
        list = addToShoppingList({
            'item': 'test3',
            'price': 3
        }, list);


        list = removeNthItem(1, list);

        chai.assert.equal(list.length, 2)

        chai.assert.equal(list[0].item, 'test')
        chai.assert.equal(list[0].price, 1)

        chai.assert.equal(list[1].item, 'test3')
        chai.assert.equal(list[1].price, 3)
    });

    it('should throw error if i < 0', () => {
        // if i < 0
        chai.assert.throws(() => {
            removeNthItem(-1, [])
        }, Error);
    });

    it('should throw error if i > length of list', () => {
        // if i > length of array
        chai.assert.throws(() => {
            removeNthItem(1, [])
        }, Error);
    });

    it('should throw error if i is not a number', () => {

        // if i is not a number
        chai.assert.throws(() => {
            removeNthItem('adfas', [])
        }, Error);
    })
});


// TEST
describe('6. removeNItems', () => {
    it('should remove i-th item from list', () => {
        let list = addToShoppingList({
            'item': 'test',
            'price': 1
        });
        list = addToShoppingList({
            'item': 'test2',
            'price': 2
        }, list);
        list = addToShoppingList({
            'item': 'test3',
            'price': 3
        }, list);


        list = removeNItems(1, 1, list);

        chai.assert.equal(list.length, 1)

        chai.assert.equal(list[0].item, 'test')
        chai.assert.equal(list[0].price, 1)
    });

    it('should throw error if i + num < 0', () => {
        // if i < 0
        chai.assert.throws(() => {
            removeNItems(-1, 0, [])
        }, Error);
    });

    it('should throw error if i + num > length of list', () => {
        // if i > length of array
        chai.assert.throws(() => {
            removeNItems(1, 2, ['a', 'b'])
        }, Error);
    });

    it('should throw error if i is not a number', () => {

        // if i is not a number
        chai.assert.throws(() => {
            removeNItems('adfas', 1, [])
        }, Error);
    })

    it('should throw error if num is not a number', () => {

        // if i is not a number
        chai.assert.throws(() => {
            removeNItems(1, 'asasdfa', [])
        }, Error);
    })

    it('should throw error if num > length of list', () => {

        // if i is not a number
        chai.assert.throws(() => {
            removeNItems(1, 8, [])
        }, Error);
    })
});

// TEST
describe('7. smartRemoveItems', () => {
    it('should return list if i > length of list', () => {
        let list = [];
        list = smartRemoveItems(1, list);

        // [] is initial state of list
        // we expect `list` to also be length 0
        // ...or, empty essentially
        chai.assert.equal(list.length, 0);
    });

    it('should remove i number from end of list if i < 0', () => {
        let list = addToShoppingList({
            'item': 'test',
            'price': 1
        });
        list = addToShoppingList({
            'item': 'test2',
            'price': 2
        }, list);
        list = addToShoppingList({
            'item': 'test3',
            'price': 3
        }, list);

        list = smartRemoveItems(-1, list);

        chai.assert.equal(list.length, 2)
        chai.assert.equal(list[0].item, 'test')
        chai.assert.equal(list[0].price, 1)
        chai.assert.equal(list[1].item, 'test2')
        chai.assert.equal(list[1].price, 2)
    });

    it('should remove i number from START if list if i > 0', () => {
        let list = addToShoppingList({
            'item': 'test',
            'price': 1
        });
        list = addToShoppingList({
            'item': 'test2',
            'price': 2
        }, list);
        list = addToShoppingList({
            'item': 'test3',
            'price': 3
        }, list);

        list = smartRemoveItems(1, list);

        chai.assert.equal(list.length, 2)
        chai.assert.equal(list[0].item, 'test2')
        chai.assert.equal(list[0].price, 2)
        chai.assert.equal(list[1].item, 'test3')
        chai.assert.equal(list[1].price, 3)
    });
});

// TEST
describe('8. spliceItem', () => {
    it('should throw an error if item is not valid', () => {
        chai.assert.throws(() => {
            spliceItem('invalidItem', 0, [])
        }, Error);
    });

    it('should insert item to the ith index of the list', () => {
        const list = spliceItem({
            'item': 'test',
            'price': 1,
        }, 0, [])

        chai.assert.equal(list[0].item, 'test')
        chai.assert.equal(list[0].price, 1)
    });

    it('should append to the end if i > length of list', () => {
        const list = spliceItem({
            'item': 'test',
            'price': 1,
        }, 9, [{
            'item': 'test0',
            'price': 0,
        }])

        chai.assert.equal(list[1].item, 'test')
        chai.assert.equal(list[1].price, 1)
    });

    it('should prepend if i < 0', () => {
        const list = spliceItem({
            'item': 'test',
            'price': 1,
        }, -1, [{
            'item': 'test0',
            'price': 0,
        }])

        chai.assert.equal(list[0].item, 'test')
        chai.assert.equal(list[0].price, 1)
    });

});

// TEST
describe('9. spliceItems', () => {
    it('should throw an error if item is not valid', () => {
        chai.assert.throws(() => {
            spliceItems([{
                'item': 'test',
                'price': 1,
            },'invalidItem'], 0, [])
        }, Error);
    });

    it('should insert items to the ith index of the list', () => {
        const list = spliceItems([{
            'item': 'test',
            'price': 1,
        }, {
            'item': 'test2',
            'price': 2,
        }], 0, [{
            'item': 'test3',
            'price': 3,
        }])

        chai.assert.equal(list[0].item, 'test')
        chai.assert.equal(list[0].price, 1)
        chai.assert.equal(list[1].item, 'test2')
        chai.assert.equal(list[1].price, 2)
    });

    it('should append to the end if i > length of list', () => {
        const list = spliceItems([{
            'item': 'test',
            'price': 1,
        }], 9, [{
            'item': 'test0',
            'price': 0,
        }])

        chai.assert.equal(list[1].item, 'test')
        chai.assert.equal(list[1].price, 1)
    });

    it('should prepend if i < 0', () => {
        const list = spliceItems([{
            'item': 'test',
            'price': 1,
        }], -1, [{
            'item': 'test0',
            'price': 0,
        }])

        chai.assert.equal(list[0].item, 'test')
        chai.assert.equal(list[0].price, 1)
    });

    it('should return list if items is empty', () => {
        const list = spliceItems([], 0, []);
        chai.assert.equal(list.length, 0)
    })
});

// TEST
describe('10. combineLists', () => {
    it('should throw an error if item is not valid', () => {
        chai.assert.throws(() => {
            combineLists([{
                'item': 'test',
                'price': 1,
            },'invalidItem'], [{
                'item': 'test2',
                'price': 2,
            }])
        }, Error);
    });

    it('should return single list with items of both lists', () => {
        const list = combineLists([{
                'item': 'test',
                'price': 1,
            }], [{
                'item': 'test2',
                'price': 2,
            }]);

        chai.assert.equal(list[0].item, 'test')
        chai.assert.equal(list[0].price, 1)
        chai.assert.equal(list[1].item, 'test2')
        chai.assert.equal(list[1].price, 2)
    });
});

// TEST
describe('11. splitListAt', () => {
    it('should break list into two at index', () => {
        const [list1, list2] = splitListAt(1, [{
                'item': 'test',
                'price': 1,
            }, {
                'item': 'test2',
                'price': 2,
            }]);

        chai.assert.equal(list1[0].item, 'test')
        chai.assert.equal(list1[0].price, 1)
        chai.assert.equal(list1[1].item, 'test2')
        chai.assert.equal(list1[1].price, 2)
        chai.assert.equal(list2.length, 0)

    });

    it('should put all items into list1 if i < 0', () => {
        const [list1, list2] = splitListAt(-1, [{
                'item': 'test',
                'price': 1,
            }, {
                'item': 'test2',
                'price': 2,
            }]);

        chai.assert.equal(list1[0].item, 'test')
        chai.assert.equal(list1[0].price, 1)
        chai.assert.equal(list1[1].item, 'test2')
        chai.assert.equal(list1[1].price, 2)
        chai.assert.equal(list2.length, 0)

    });

    it('should put all items into list2 if i > length of list', () => {
        const [list1, list2] = splitListAt(100, [{
                'item': 'test',
                'price': 1,
            }, {
                'item': 'test2',
                'price': 2,
            }]);

        chai.assert.equal(list1.length, 0)
        chai.assert.equal(list2[0].item, 'test')
        chai.assert.equal(list2[0].price, 1)
        chai.assert.equal(list2[1].item, 'test2')
        chai.assert.equal(list2[1].price, 2)


    });

    it('should return two lists', () => {
        const [list1, list2] = splitListAt(1, [{
                'item': 'test',
                'price': 1,
            }, {
                'item': 'test2',
                'price': 2,
            }]);

        chai.assert.isArray(list1)
        chai.assert.isArray(list2)
    })

});

// TEST
describe('12. canExpressCheckout', () => {
    it('should return true if num items < 10', () => {
        chai.assert.equal(canExpressCheckout([{
                'item': 'test',
                'price': 1,
            }, {
                'item': 'test2',
                'price': 2,
            }]), true);
    })
});

// TEST
describe('13. computeSum', () => {
    it('should return sum of all item prices in array', () => {
        const sum = computeSum([{
                'item': 'test',
                'price': 1,
            }, {
                'item': 'test2',
                'price': 2,
            }]);

        chai.assert.equal(sum, 3);
    });
});

// TEST
describe('14. computeSumWithTax', () => {
    it('should return sum of all item prices in array + taxes', () => {
        const sum = computeSumWithTax([{
                'item': 'test',
                'price': 1,
            }, {
                'item': 'test2',
                'price': 2,
            }], 10);

        // stupid hack to prevent the 3.3000000000000003 error...
        chai.assert.equal(Math.floor(100*sum)/100, 3.3);
    });
});

// TEST
describe('15. computeSumInRange', () => {
    it('should throw error if i > j', () => {
        chai.assert.throws(() => {
            computeSumInRange(100, 1, [])
        }, Error)
    })

    it('should throw error if i < 0', () => {
        chai.assert.throws(() => {
            computeSumInRange(-1, 1, [])
        }, Error)
    })

    it('should throw error if i > length of list', () => {
        chai.assert.throws(() => {
            computeSumInRange(100, 101, [])
        }, Error)
    })

    it('should throw error if j < 0', () => {
        chai.assert.throws(() => {
            computeSumInRange(0, -1, [])
        }, Error)
    })

    it('should throw error if j > length of list', () => {
        chai.assert.throws(() => {
            computeSumInRange(0, 100, [])
        }, Error)
    })

    it('should sum all the price items FROM start index `i` and end index `j` and return value', () => {
        const sum =  computeSumInRange(1, 3, [
            newShoppingListItem('test', 1),
            newShoppingListItem('test2', 2),
            newShoppingListItem('test3', 3),
            newShoppingListItem('test4', 4)
        ]);

        chai.assert.equal(sum, 9)
    })
});



