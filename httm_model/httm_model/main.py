import numpy as np
import pandas as pd
import pyodbc

import copy
import time

from sklearn.preprocessing import LabelEncoder
import matplotlib.pyplot as plt
import scipy.cluster.hierarchy as shc



SERVER = 'localhost'
DATABASE = 'ThuocTay'
USERNAME = 'sa'
PASSWORD = '1'

cnxn = pyodbc.connect('DRIVER={SQL Server};SERVER='+SERVER+';DATABASE='+DATABASE+';UID='+USERNAME+';PWD='+ PASSWORD)
cursor = cnxn.cursor()



def read_data_from_sql():
    sql_query = '''select top 200 t.id, ten_thuoc, cong_dung, count(ctdc.id_duoc_chat) as soLuongDuocChat, sum(ctdc.id_duoc_chat) as tongTrongSoDuocChat from
	(select id_duoc_chat, id_thuoc from ct_duoc_chat) ctdc,
	(select id, ten_thuoc, cong_dung from thuoc) t
	where ctdc.id_thuoc = t.id
group by t.id, ten_thuoc, cong_dung '''
    data = pd.read_sql(sql_query, cnxn)
    #print(data)
    return data, data.iloc[:,0]
def convert_text_to_number(data):
    le = LabelEncoder()
    label = ["tenThuoc", "congDung", "soLuongDuocChat", "tongTrongSoDuocChat"]
    data.iloc[:, 0] = le.fit_transform(data.iloc[:, 0])
    data.iloc[:, 1] = le.fit_transform(data.iloc[:, 1])
    print("max value: ", max(data.max(axis=0)))
    data = data / (max(data.max(axis=0))+1)
    return data
def cal_distance_matrix(data):
    number_drug = len(data)
    distance_matrix = np.zeros(shape=(number_drug, number_drug))
    for i in range(len(data)):
        for j in range(0, i):
            if i != j:
                distance_ecl = np.power((data.iloc[i] - data.iloc[j]), 2)
                distance_ecl = np.sqrt(distance_ecl.sum())
                distance_matrix[i][j] = distance_ecl
                distance_matrix[j][i] = distance_matrix[i][j]
    #print(distance_matrix)
    return distance_matrix

data, all_elements = read_data_from_sql()
_all_elements = copy.copy(all_elements)
all_elements = all_elements.tolist()

#print(data)
data = data.iloc[:,1:]
data = convert_text_to_number(data)
mat = cal_distance_matrix(data)
for i in range(len(all_elements)):
        all_elements[i] = str(all_elements[i])
all_elements_copy = copy.copy(all_elements)
dissimilarity_matrix = pd.DataFrame(mat, index=all_elements, columns=all_elements)

# Ko dung bien global
def write_data_to_sql():
    data = get_data_insert_sql()
    # data = np.load("data_insert_sql_200_records.npy", allow_pickle=True
    data = pd.DataFrame(data)

    data = data.transpose()
    data.columns = ['thuoc_lq1', 'thuoc_lq2', 'thuoc_lq3', 'thuoc_lq4', 'thuoc_lq5', 'thuoc_lq6', 'thuoc_lq7',
                    'thuoc_lq8', 'thuoc_lq9', 'thuoc_lq10']
    _a = _all_elements.to_numpy()
    data['thuoc_dx'] = _a
    # print(data)
    # Insert Dataframe into SQL Server:

    cursor.execute("DELETE FROM thuoc_lien_quan")
    cnxn.commit()
    

    for index, row in data.iterrows():
        
        #row = row.astype(int)
        cursor.execute('''INSERT INTO thuoc_lien_quan values(?,?,?,?,?,?,?,?,?,?,?)'''
        ,
                       int(row.thuoc_dx), int(row.thuoc_lq1), int(row.thuoc_lq2), int(row.thuoc_lq3), int(row.thuoc_lq4), int(row.thuoc_lq5), int(row.thuoc_lq6), int(row.thuoc_lq7), int(row.thuoc_lq8), int(row.thuoc_lq9), int(row.thuoc_lq10))
    cnxn.commit()
    cursor.close()

# all_elements_copy
# get_all_clusters()
def get_data_insert_sql():
    start = time.time()
    (all_of_clusters, level) = get_all_clusters()
    end = time.time()
    print("thời gian phân cụm: ", end - start)

    start = time.time()
    data_insert_sql = {}
    print("all_elements", all_elements_copy)
    for i in all_elements_copy:
        number_product = 0
        level_max = level-1
        data_insert_sql[i] = []
        #print("i: ", i)
        while level_max >= 1 and number_product < 10:
            for cluster in all_of_clusters[str(level_max)]:
                #print(cluster)
                if i in cluster:
                    for j in cluster:
                        if j != i and j not in data_insert_sql[i]:
                            data_insert_sql[i].append(j)
                            #print("data_insert_sql", data_insert_sql)
                            number_product += 1
                            if number_product >= 10:
                                break
                            #print("number_product: ", number_product)
                    break
            level_max -= 1

    end = time.time()
    #print(data_insert_sql)
    print("thời gian chuyển các cụm thành sản phẩm liên quan để lưu vào sql: ", end - start)
    return data_insert_sql

# all_elements
# split()
# max_diameter()
def get_all_clusters():

    # 1 cụm ban đầu gồm tất cả element:
    current_clusters = [all_elements]

    level = 1
    index = 0
    all_of_clusters = {}

    while index != -1:
        print(level, current_clusters)
        # dung deepcopy cho list nested nest
        # nếu không dùng copy thì sau khi rời vòng lặp thì biến current_clusters sẽ nhận giá trị là [all_elements]
        all_of_clusters[str(level)] = copy.deepcopy(current_clusters)

        # chọn cụm current_clusters[index] để phân,
        (a_clstr, b_clstr) = split(current_clusters[index])
        # delete objects, variables, lists, or parts of a list etc.
        # sau khi phân cụm này thành 2 cụm con thì xóa cụm này khỏi list cụm (current_clusters) và thêm 2 cụm con vào list cụm
        del current_clusters[index]
        current_clusters.append(a_clstr)
        current_clusters.append(b_clstr)
        # print(current_clusters)
        # np.save("current_clusters.npy",current_clusters)
        index = max_diameter(current_clusters)
        level += 1

    all_of_clusters[str(level)] = copy.deepcopy(current_clusters)
    print("all_of_clusters", all_of_clusters)

    return all_of_clusters, level

# splinter()
def split(element_list):
    # giả sử cụm ban đầu cluster_list = ['a','b','c','d','e']
    # main_list = list(np.load("main_list.npy"))
    # splinter_group = list(np.load("splinter_group.npy"))
    main_list = element_list
    splinter_group = []
    # print("main_list",main_list)
    # print("splinter_group",splinter_group)
    (most_dissm_object_index, flag) = splinter(main_list, splinter_group)
    # print("most_dissm_object_index", most_dissm_object_index)
    # print("flag", flag)
    # de qui
    while (flag > 0):
        main_list.remove(most_dissm_object_index)
        splinter_group.append(most_dissm_object_index)

        # print("main_list", main_list)
        # print("splinter_group", splinter_group)
        
        (most_dissm_object_index, flag) = splinter(main_list, splinter_group)
        # print("flag", flag)
        # print("main list", main_list)
        # print("splinter_group", splinter_group)

    return (main_list, splinter_group)

# avg_dissim_within_group_element()
def splinter(main_list, splinter_group):
    # giả sử cụm ban đầu main_list = ['a','b','c','d','e']
    # splinter_group = []
    # gia tri doi tuong khac biet
    most_dissm_object_value = -np.inf
    most_dissm_object_index = None
    #print(len(main_list))
    for ele in main_list:
        # if int(ele) % 500 == 0:
        #     print("ele", ele)


        # giả sử ele = 'a', main_list = ['a','b','c','d','e']
        x = avg_dissim_within_group_element(ele, main_list)
        y = avg_dissim_across_group_element(ele, main_list, splinter_group)
        # print("x", x)
        # print("y",y)
        diff = x - y
        # print("diff", diff)
        if diff > most_dissm_object_value:
            most_dissm_object_value = diff
            most_dissm_object_index = ele
    # print("most_dissm_object_value", most_dissm_object_value)
    # print("most_dissm_object_index", most_dissm_object_index)
    if most_dissm_object_value > 0:
        # return 1 ở đây là giá trị flag
        return (most_dissm_object_index, 1)
    # nếu giá trị most_dissm_object_value < 0: nghĩa là từng element trong nhánh main_list không thể di chuyển sang nhánh splinter_group
    else:
        return (-1, -1)
    
# dissimilarity_matrix
def avg_dissim_within_group_element(ele, element_list):

    max_diameter = -np.inf
    sum_dissm = 0
    for i in element_list:

        # giả sử tính tổng khoảng cách từ ele = 'a' đến các phần từ i trong main_list = ['a','b','c','d','e']
        sum_dissm += dissimilarity_matrix[ele][i]
        if (dissimilarity_matrix[ele][i] > max_diameter):
            max_diameter = dissimilarity_matrix[ele][i]
    if (len(element_list) > 1):
        # giả sử tính tb khoảng cách từ a đến các phần từ trong main_list = ['a','b','c','d','e']
        # sum_dissm: tổng của 4 đoạn: ab, ac, ad, ae nên phải chia cho len(main_list) - 1
        avg = sum_dissm / (len(element_list) - 1)
        #print("sum_dissm", sum_dissm)
    else:
        # khi main_list = ['a'] khoảng cách từ a -> chính nó = 0
        avg = 0
    return avg

#dissimilarity_matrix
def avg_dissim_across_group_element(ele, main_list, splinter_list):

    if len(splinter_list) == 0:
        return 0
    sum_dissm = 0
    for j in splinter_list:
        sum_dissm = sum_dissm + dissimilarity_matrix[ele][j]
    avg = sum_dissm / (len(splinter_list))
    #print("sum_dissm accross", sum_dissm)
    return avg

# dissimilarity_matrix
def max_diameter(cluster_list):

    # lấy đc index của cụm có diameter lớn nhất -> mục đích lấy cụm này để phân cụm tiếp
    max_diameter_cluster_index = None
    # tìm đường kính lớn nhất trong các cụm
    max_diameter_cluster_value = -np.inf
    index = 0
    for element_list in cluster_list:
        for i in element_list:
            for j in element_list:
                if dissimilarity_matrix[i][j] > max_diameter_cluster_value:
                    max_diameter_cluster_value = dissimilarity_matrix[i][j]
                    max_diameter_cluster_index = index

        index += 1

    # khi mỗi object một cụm thì ta dừng phân cụm
    if (max_diameter_cluster_value <= 0):
        return -1

    return max_diameter_cluster_index


if __name__ == "__main__":
    write_data_to_sql()