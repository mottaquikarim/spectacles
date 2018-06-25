/* 
 * FILENAME:    prompt.js
 * DESC:        write any starter code required here 
 */

/* 1
    @function newShoppingListItem
    @param item {string}
    @param price {number}
    @returns {object}
    @description
        given an item and a price, return
        an object that looks like this:
        {
            'item': 'eggs',
            'price': 1.59
        }
        OPTIONAL:
            - validate that item is string
                and price is number
                if invalid, throw error
        OPTIONAL:
            - validate that item has fewer than 10 characters
            - validate that price is less than 100 and has only
                two decimal places
*/

// implement function here




/* 2
    @function addToShoppingList
    @param item {object}
    @param list {array, []}
    @returns list
    @description
        add shoppinglist item object (ie:
            {
                'item': 'eggs',
                'price': 1.59
            }
        ) to a list
        list is to DEFAULT to []
        OPTIONAL:
            - validate that the item is indeed a shoppingList item
            - if shoppingList item is not passed in, throw error
*/

// implement function here


/* 3
    @function removeFromShoppingList
    @param list {array, []}
    @returns list
    @description
        if array is empty, return it immediately
        if array has items, remove the LAST item
            and then return the array
*/

// implement function here


/* 4
    @function removeFirstItem
    @param list {array, []}
    @returns list
    @description
        if array is empty, return it immediately
        if array has items, remove the FIRST item
            and then return the array
*/

// implement function here


/* 5
    @function removeNthItem
    @param i {number}
    @param list {array, []}
    @returns list
    @description
        given `i`, an index < length of list
        remove that item from list and return the
        resulting list
        if...
            - what if `i` > length of list
            - `i` is < 0
            - `i` is not number
        ^^ return error
*/

// implement function here

/* 6
    @function removeNItems
    @param i {number}
    @param num {number}
    @param list {array, []}
    @returns list
    @description
        same as above but now we wish to remove ALL
        items from i to i+num and return the resulting list
        if...
            - `i` < 0
            - `i` or `num` is not a number
            - `i+num` > length of list
            - `num` > length of list
        ^^ return error
*/

// implement function here

/* 7
    @function smartRemoveItems
    @param i {number}
    @param list {array, []}
    @returns list
    @description
        - if `i` is < 0, remove i number of items
            from END of list
        - if `i` > length of list, return list immediately
        - if `i` > 0 remove i number of items
            from START of list
*/

// implement function here


/* 8
    @function spliceItem
    @para item {object}
    @param i {number}
    @param list {array, []}
    @returns list
    @description
        - item must be an object that looks like this:
        {
            'item': 'eggs',
            'price': 1.59
        } (else throw error)
        - insert item into the ith index of the list
        - if i > length of list, just append
        - if i < 0, just prepend
*/

// implement function here



/* 9
    @function spliceItems
    @param items {list}
    @param i {number}
    @param list {array, []}
    @returns list
    @description
        - *EACH* item in `items` must be an object
        that looks like this:
        {
            'item': 'eggs',
            'price': 1.59
        } (else throw error)
        - insert items into the ith index of the list
        - if i > length of list, just append
        - if i < 0, just prepend
        - if `items` is empty, return list
*/

// implement function here



/* 10
    @function combineLists
    @param items1 {list}
    @param items2 {list}
    @returns list
    @description
        given two lists of items
        - *EACH* item in `items` must be an object
        that looks like this:
        {
            'item': 'eggs',
            'price': 1.59
        } (else throw error)
        - return ONE list that contains items in
        items1 THEN items in items2 as a single array
*/

// implement function here


/* 11
    @function splitListAt
    @param i {number}
    @param list {array, []}
    @returns list
    @description
        given a number i that is within bounds of
        `list`, break it into two lists where
        `list1` has all items less than or equal to i
        and `list2` has all items > i
        - if `i` < 0, `list1` has all items and `list2`
            is empty list
        - if `i` > length of list, list1 is empty and `list2`
            has all items

        - always return a list that looks like this:
            [list1, list2]

*/

// implement function here



/* 12
    @function canExpressCheckout
    @param list {array, []}
    @returns {boolean}
    @description
        if there are fewer than 10 items
        in list, return true
*/

// implement function here



/* 13
    @function computeSum
    @param list {array, []}
    @returns {number}
    @description
        given a list of objects that look like this:
        {
            'item': 'eggs',
            'price': 1.59
        }
        - sum all the price items and return value
*/

// implement function here



/* 14
    @function computeSumWithTax
    @param list {array, []}
    @param taxRate {number, 8.125}
    @returns {number}
    @description
        given a list of objects that look like this:
        {
            'item': 'eggs',
            'price': 1.59
        }
        - sum all the price items and return value AND
            apply tax value
        - note that tax is passed in as percent not decimal

*/

// implement function here



/* 15
    @function computeSumInRange
    @param i {number}
    @param j {number}
    @param list {array, []}
    @returns {number}
    @description
        given a list of objects that look like this:
        {
            'item': 'eggs',
            'price': 1.59
        }
        - sum all the price items FROM start index `i` and
            end index `j` and return value
        - if i > j, throw error
        - if i or j not in range, throw error
*/

// implement function here


    
