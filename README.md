# Examining the CSE Undergraduate Admission Data

This project visualizes admission data from the department of Computer Science and Engineering. It uses Sankey diagrams to display the flow of students through the admission process. Users can apply filters to select and compare groups of students.

## Team Members

1. Sachin Mehta
2. Sam Crow
3. Wesley Lee

## Breakdown


- Wesley was in charge of initial storyboarding and data analysis
- When coding up the visualization, Sachin focused on Sankey Diagram visualization while Sam focused on filter design
- Development process
 - 10 hour (data collection/discussion/Analysis with Stuart and Alex)
 - 3 hours storyboarding
 - 22 hours on setting up filters
 - 20 hours on setting up the Sankey Diagram
 - 12 hours on setting up the statistical box plot
 - 15 hours on integrating the code (including bug fixes)
 - 14 hours tinkering with the design
- Due to our inexperience with JavaScript and less familirity with D3, the most time consuming part was coding up the first draft of our visualization (one sankey diagram with 2-3 filters)


## Project

This project visualizes admission data from the department of Computer Science and Engineering. It uses Sankey diagrams to display the flow of students through the admission process. Users can apply filters to select and compare groups of students. Filters can be applied at two stages:
- Global filters: These filters are applied on overall data. For example, if you want to compare the admission statistics for Male and Female students, then you would select Male in Group 1 filters and Female in Group 2 filters. Global filters would return only the relevant records for each group, male records for Group 1 and female records for Group 2.
- Local filters: Once you apply global filters, you might be interested in comparing one particular stage. For example, you want to compare the different variables for both Male and Female between CSE 142 and CSE 143. In that case, you would select the particular stage in both groups using local filters. 

[Poster] (https://github.com/CSE512-16S/fp-sacmehta-samcrow-wesleytlee/blob/master/final/poster-sacmehta-samcrow-wtlee.pdf),
[Final Paper] (https://github.com/CSE512-16S/fp-sacmehta-samcrow-wesleytlee/blob/master/final/paper-sacmehta-samcrow-wtlee.pdf)

## Running Instructions

Access our visualization at https://cse512-16s.github.io/fp-sacmehta-samcrow-wesleytlee/visualization/ or download this repository and run `python -m SimpleHTTPServer 9000` and access this from http://localhost:9000/.

Please visit http://cse512-16s.github.io/fp-sacmehta-samcrow-wesleytlee for more details.

For optimal viewing, please view our visualization in a large window or full-screen.
