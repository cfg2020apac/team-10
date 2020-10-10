from hungarian_algorithm import algorithm

userA = ["male", "20-30", "chinese", "christian","day","smoker","sammy"]
userB = ["male", "20-30", "malay","muslim","day","non-smoker","roy"]
userC = ["female","30-40", "chinese", "christian","night", "smoker", "sara"]
userD = ["female","40-50","chinese","christian","day","smoker","grace"]

#user_attributes = [gender, age, race, religion,day/night,smoker,preference_weights,name]
#bipartite match male and females?

all_users = [userA,userC,userB,userD]

half_size = len(all_users)//2
first_client_group = all_users[half_size:]
second_client_group = all_users[:half_size]

def generate_top_preferences(user,second_client_group):
    #return ordered list of prefered matches
    pref_dict = {}
    for user2 in second_client_group:
      score = 0
      for i in range(6):
        if user[i] == user2[i]:
          score += 1
      name = user2[6]
      pref_dict[name] = score
    return pref_dict 

def generate_bipartite_graph(first_client_group,second_client_group):
  G = {}
  for user in first_client_group:
    G[user[6]] = generate_top_preferences(user,second_client_group)
  return G

G = generate_bipartite_graph(first_client_group,second_client_group)

match = algorithm.find_matching(G, matching_type = 'max', return_type = 'list' )
