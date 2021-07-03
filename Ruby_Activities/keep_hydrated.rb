
def water_intake(time)
	#print "Please enter time in hours"
	#time = gets.chomp.to_f
  liters =  time * 0.5
  puts "time = #{time}   liters = #{liters.floor()}"
end

water_intake(3)
water_intake(6.7)
water_intake(11.8)


