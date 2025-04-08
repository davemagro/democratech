- Voter awareness 

  - CMS

- Integrity reports 

  - Report submission portal 

    - Content of a report: What kinds reports can be submitted? 

      - Social media posts 

        - must be screenshot or copy paste 

        - include link in the body of the report 

      - Media artifacts 

      - Written description (with media artifacts)

    - Report details 

      - Incident location(s) 

      - Incident subjects(s)

        - i think this should be obtained from the post (AI/NLP)

      - Nature of the post

        - could be inferred from the post as well 

        - could tags work?? 

          - recommend tags to the user 

        - TODO: Make a list of tags, and how to come up with those tags 

      - time of incident 

        - could it be inffered from the post as well? then recommend to the 
          user? 
  
  - Incident evaluation/Report review interface 

    - is it spammy? 

    - is it helpful? 

    - is it truthful? factual? 

    - is it neutral? biased? 

    - is it a high quality report? does it include high-quality sources

    - is it easy to understand? 

    - does it address the claim directly? 

  - Content wall 

    - Recommend reports that are most relevant to the user, as these are 
      the ones to which they are most likely to provide helpful evaluations 
      to.

- Chats channels 




File a report

- what's happening 

- additional information: 

	- ideal: Additional information is inferred and is show a preview 
		 if location cannot be inferred but seems to be critical that 
		 it should be, an indicator is shown to encourage the user to 
		 add the said information (i.e. location) 

		- additional informations: are those that can help us relate 
			these reports to other users. the more information 
			we get for a post, the better we relate it to our user.

	- f.t.m.: Users will manyally add the additional information. All of 
		 these are considered optional.




Review a report: 

- report view 

- review criteria: 

	- how factual? 

	- how neutral 

	- quality 

		- easy to understand / straight to the point 

		- sites high quality sources 
	
	- how relevant is the report to the incident it is reporting 

		- does the report address the issue directly? 



Recommendation models: 

  - recommendation is based on relevance to a user and the freshness

	- content based filtering 
		
		- personalized

      - recommend reports who are similar to the user's own reports 

      - recommend reports to which are similar to reports that the user has 
        previously reviewed on 

    - recommend reports who are made by highly vouched users 

    - recommend reports who is getting viral (getting a lot of reviews in a short amount of time)

    - recommend posts which are well-vouched by the community, but maybe has not yet reached a certain threshold

      - if a post reaches a certain threshold, further reviews may not be needed

    - recommendation strategy for brand new reports:

      - brand new reports gets recommended to who? 

        - depending on who posted it

          - if submitted by a new user, it gets recommended only to people who 
            is in roughly the same space as the post 

          - if submitted by a user with previous submissions and interactions, 
            the report will be recommended


Architecture: 

- upon submission, the system will find recommendations list to which this post 
  can fit into



Limitations: 

- relies on users submitting high quality reports 

  - enough appropriate tags, etc. 

  - but it could be made not to, i.e. rely on user alone to submit high quality reports 
    by using named entity recognitions, topic modelling, etc.



