import { storage } from "./storage";
let mockStorage = {};
// Mock localStorage since node.js doesn't have it
vi.stubGlobal("localStorage", {
    getItem(key) {
        return mockStorage[key] || null;
    },
    setItem(key, value) {
        mockStorage[key] = value;
    },
});
describe("storage", () => {
    afterEach(() => {
        // clean mock storage after each test
        mockStorage = {};
    });
    it("value is updated in store and written to localStorage", () => {
        const store = storage("test", 1);
        let storeVal = -1;
        store.subscribe((val) => (storeVal = val));
        expect(storeVal).to.eq(1);
        store.set(2);
        expect(storeVal)
            .to.eq(2)
            .to.eq(Number.parseFloat(localStorage.getItem("test")));
    });
    it("value is gotten from localStorage", () => {
        localStorage.setItem("test", "4");
        const store = storage("test", 3);
        let storeVal = -1;
        store.subscribe((val) => (storeVal = val));
        expect(storeVal).to.eq(4);
    });
});
