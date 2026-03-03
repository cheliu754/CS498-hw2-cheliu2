import requests, uuid

us_url = 'http://136.119.190.146:8080'
eu_url = 'http://35.205.59.116:8080'


def test_lm(url):
    ret = []
    avg = 0
    for i in range(15):
        data = {
            "username": "test_" + str(i)
        }
        response = requests.post(url + '/register', json=data)
        elapsed = response.elapsed.total_seconds() * 1000
        ret.append(elapsed)
        avg += elapsed
        
    avg /= 15
    return (ret, avg)

def test_list(url):
    ret = []
    avg = 0
    for i in range(15):
        response = requests.get(url + '/list')
        elapsed = response.elapsed.total_seconds() * 1000
        ret.append(elapsed)
        avg += elapsed
        
    avg /= 15
    return (ret, avg)

def test_1000():
    counter = 0
    for i in range(1000):
        user_id = str(uuid.uuid4())
        data = {
            "username": user_id
        }
        requests.post(us_url + '/register', json=data)
        response = requests.get(eu_url + '/list')
        if user_id not in response.json()["users"]:
            counter += 1
            
    return counter

print(test_lm(us_url))

print(test_lm(eu_url))

print(test_list(us_url))

print(test_list(eu_url))

print(test_1000())