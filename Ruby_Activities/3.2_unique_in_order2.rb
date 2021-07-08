def unique_in_order(str)
	if str.class == String
		result = str.squeeze
		puts "unique_in_order('#{str}') == #{result.split('')}"
	elsif str.class == Array
		result = str.join.squeeze  #convert array to string
		puts "unique_in_order('#{str}') == #{result.split('').map(&:to_i)}"  # split to convert string to array then .map to convert from sting to integer
	end		
end
unique_in_order('AAAABBBCCDAABBB')
unique_in_order('ABBCcAD')
unique_in_order([1,2,2,3,3,1,2])

#Use squeeze (STR method) instead of uniq (array method) because the former will not chop off the duplicate chars in the entire string only those that are next to it. 
