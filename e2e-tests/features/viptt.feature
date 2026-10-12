@VipttRegressionCI @VipttRegression
Feature: VIPTT - Visa Processing Times Tool

  Scenario Outline: VIPTT - Visa Processing Times Tool - E2E
    Given I visit the Visa Processing Times Tool page
    When I fill out VIPTT form for scenario "<Description>"
    Then I should see "<Page>" page

    Examples:
      | Description                              | Page                                                                                         |
      | T1: In UK, For work, Health/Care Yes, In SLA | Outcome – Check your visa processing time – GOV.UK                                           |
      | T2: In UK, To study, Out of SLA              | Outcome – Check your visa processing time – GOV.UK                                           |
      | T3: In UK, Something else                    | Family visas and applications to settle in the UK – Check your visa processing time – GOV.UK |
      | T4: Not in UK, To get married, In SLA        | Outcome – Check your visa processing time – GOV.UK                                           |
      | T5: Not in UK, To travel, Out of SLA         | Outcome – Check your visa processing time – GOV.UK                                           |
      | T6: Not in UK, Something else                | Family visas and applications to settle in the UK – Check your visa processing time – GOV.UK |
      | T7: In UK, Priority, Family Visa Yes         | Family visas and applications to settle in the UK – Check your visa processing time – GOV.UK |
      | T8: In UK, Priority, In SLA                  | Outcome – Check your visa processing time – GOV.UK                                           |
      | T9: In UK, Priority, Out of SLA              | Outcome – Check your visa processing time – GOV.UK                                           |
      | T10: Not in UK, Priority, Family Visa Yes    | Family visas and applications to settle in the UK – Check your visa processing time – GOV.UK |
      | T11: In UK, Super Priority, In SLA           | Outcome – Check your visa processing time – GOV.UK                                           |
      | T12: In UK, Super Priority, Out of SLA       | Outcome – Check your visa processing time – GOV.UK                                           |
