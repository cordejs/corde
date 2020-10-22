Feature: Cucumber
  Scenario: Check Corde's version
    When I run `yarn corde -v` 
    Then the output should contain "v2.0.0-beta.6"
    And the exit status should be 0
