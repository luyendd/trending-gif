# Testing System

Testing is very important development stage that not only ensures an application works correctly in Production, but also save us tremendous time in the future while adding more code.

To truly protect ours users, we should priority requirements over test coverages. For example, we should declare all tests match all requirement instead of write 100% test coverage. This could raise a bug that we're not aware of.

Basically, there are 3 popular methods for tests:

- **Unit tests**: validate the functionality of isolated code independently. They test the output of a “unit,” a pure function that always gives the same result for a given input.
- **Integration tests**: verify the flow of data and the interaction of components. Once you want to examine the combined behavior of two or more units together, it is an integration test.
- **End to end (E2E) tests**: look at the behavior of the overall application like a real user. Because they need to go though every scenario as a real user, they're expensive and time-consuming. That's why we need to consider to run E2E tests only before deployment.
