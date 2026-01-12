from typing import TypedDict


class EstimateBreakdown(TypedDict):
    base_cost: float
    renovation_type_multiplier: float
    quality_multiplier: float
    floor_multiplier: float
    surface_subtotal: float
    bathrooms_cost: float
    energy_upgrade_cost: float
    labor_cost: float
    total: float


# Multipliers as per specification
RENOVATION_TYPE_MULTIPLIERS = {
    'full': 1.0,
    'partial': 0.75,
    'minimal': 0.5
}

QUALITY_MULTIPLIERS = {
    'high': 1.0,
    'medium': 0.8,
    'economy': 0.5
}

FLOOR_MULTIPLIERS = {
    'ground': 1.0,
    'intermediate': 0.95,
    'top': 1.1
}

# Constants
BASE_PRICE_PER_SQM = 1430
BATHROOM_COST = 3500
ENERGY_UPGRADE_PERCENTAGE = 0.15
LABOR_COST_PERCENTAGE = 0.50  # 50% of total cost is labor (manodopera)


def calculate_estimate(
    surface: float,
    renovation_type: str,
    quality: str,
    bathrooms: int,
    floor: str,
    energy_upgrade: bool
) -> EstimateBreakdown:
    """
    Calculate renovation cost estimate.
    
    Formula: (surface × 1430 × type_mult × quality_mult × floor_mult) 
             + (bathrooms × 3500) 
             + (if energy_upgrade then total × 0.15)
    """
    type_mult = RENOVATION_TYPE_MULTIPLIERS[renovation_type]
    quality_mult = QUALITY_MULTIPLIERS[quality]
    floor_mult = FLOOR_MULTIPLIERS[floor]
    
    # Base calculation
    base_cost = surface * BASE_PRICE_PER_SQM
    surface_subtotal = base_cost * type_mult * quality_mult * floor_mult
    
    # Bathrooms cost
    bathrooms_cost = bathrooms * BATHROOM_COST
    
    # Subtotal before energy upgrade
    subtotal = surface_subtotal + bathrooms_cost
    
    # Energy upgrade cost (15% of subtotal)
    energy_upgrade_cost = subtotal * ENERGY_UPGRADE_PERCENTAGE if energy_upgrade else 0.0
    
    # Total
    total = subtotal + energy_upgrade_cost
    
    # Labor cost (manodopera) - approximately 50% of total
    labor_cost = total * LABOR_COST_PERCENTAGE
    
    return EstimateBreakdown(
        base_cost=round(base_cost, 2),
        renovation_type_multiplier=type_mult,
        quality_multiplier=quality_mult,
        floor_multiplier=floor_mult,
        surface_subtotal=round(surface_subtotal, 2),
        bathrooms_cost=round(bathrooms_cost, 2),
        energy_upgrade_cost=round(energy_upgrade_cost, 2),
        labor_cost=round(labor_cost, 2),
        total=round(total, 2)
    )
