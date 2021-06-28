def iseven()
	arr = [6, 3, 1, 8, 4, 2, 10, 65, 102]
	even_arr = arr.select{|el| el.even?}
	return even_arr
end
puts iseven().inspect


