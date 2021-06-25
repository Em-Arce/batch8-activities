print "Please enter a number"
number = gets.chomp.to_f

def isPerfectSquare(number)
	i = 1
	while i*i <= number
		if (number % i) == 0 && (number / i) == i
			return true
		else
			i += 1
		end
	end
		return false
end
if isPerfectSquare(number)
	puts "true"
else
	puts "false"
end
