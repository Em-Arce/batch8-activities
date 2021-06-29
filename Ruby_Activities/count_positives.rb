#count positive
array = [1,2,3,4,5,6,7,8,9,10, -11, -12, -13, -14, -15]
 
if array.length == 0
	puts "Input array is empty"
elsif array.length > 0
	positive = array.select {|a| a > 0}
	puts positive.inspect
	puts "Count of positive elements: #{positive.length}"

	negative = array.drop_while {|a| a > 0}
	puts negative.inspect
	puts "Sum of negative elements: #{negative.sum}"

	new_arr = []
	new_arr.push(positive.length)
	new_arr.push(negative.sum)

	puts "The new array: #{new_arr.inspect}"
end
