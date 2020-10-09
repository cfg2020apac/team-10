from hungarian_algorithm import algorithm

#user_attributes = [gender, age, race, religion,day/night,smoker,preference_weights,name]
#bipartite match male and females?

size = len(all_users)
first_client_group = all_users[size//2:]
second_client_group = all_users[:(size//2)+1]


def generate_top_preferences(preference_weights,second_client_group):
    #return ordered list of prefered matches
    pref_dict = {}
    for user in second_client_group:
      score = 0
      for i in range(6):
        score += preference_weights[i] * user[i]
      pref_dict[second_client_group[7]] = score 
    return pref_dict 

def generate_bipartite_graph(first_client_group,second_client_group):
  G = {}
  for user in first_client_group:
    G[user[7]] = generate_top_preferences(user[6],second_client_group)
  return G

generate_bipartite_graph(first_client_group,second_client_group)

algorithm.find_matching(G, matching_type = 'min', return_type = 'list' )
