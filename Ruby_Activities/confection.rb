class Confection
	attr_accessor :name
	def initialize(name)
		@name = name
	end

	def prepare
		"baking at 350 degrees for 25 minutes"
	end 
end

class Banana_Cake < Confection
	def prepare
		"#{name.capitalize} is " + super
	end
end

class Cupcake < Confection
	def prepare
		"#{name.capitalize} is "+ super + " then applying frosting"
	end
end

choconana = Banana_Cake.new("choconana cake")
puts choconana.prepare
darkchoco = Cupcake.new("darkchoco cupcake")
puts darkchoco.prepare
