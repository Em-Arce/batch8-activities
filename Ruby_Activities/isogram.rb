def is_isogram?(str)
	seen = Hash.new(0)  # create new object represented by seen with keys as chars of string and value as the count of that char  
	# str.downcase -> convert string to lowercase
	# str.downcase.each_char.any? -> for every letter in the string will there be any that will satisfy the criteria in the codeblock on the right : return true if there is, else false 
	# { |ltr| (seen[ltr] += 1) } -> each ltr in str will be assigned as key in the object represented by seen, its value will be incremented by 1 if it is encountered more than once in the string
	# { |ltr| (seen[ltr] += 1) >= 2 } -> if any key will have value = or > than 2; return true, else return false
	result = str.downcase.each_char.any? { |ltr| (seen[ltr] += 1) >= 2 }   
	puts "is_isogram('#{str}') => #{result}"
	#puts "Seen object key value pairs:"
	#seen.each{ |key, value| puts "#{key}: #{value}"}
end
is_isogram?('Dermatoglyphics')
is_isogram?('aba')
is_isogram?('MoOse')

#REFERENCE
#https://stackoverflow.com/questions/43822855/ruby-method-to-check-if-element-already-appeared
