/**
 * Blood Compatibility Utility
 * Implements medical blood group compatibility rules for the dispatcher algorithm
 */

// Blood group compatibility matrix
// A donor can donate to specified recipient groups
const COMPATIBILITY_MATRIX = {
  'O-': { // Universal donor
    canDonateTo: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
    canReceiveFrom: ['O-']
  },
  'O+': {
    canDonateTo: ['O+', 'A+', 'B+', 'AB+'],
    canReceiveFrom: ['O-', 'O+']
  },
  'A-': {
    canDonateTo: ['A-', 'A+'],
    canReceiveFrom: ['O-', 'A-']
  },
  'A+': {
    canDonateTo: ['A+'],
    canReceiveFrom: ['O-', 'O+', 'A-', 'A+']
  },
  'B-': {
    canDonateTo: ['B-', 'B+'],
    canReceiveFrom: ['O-', 'B-']
  },
  'B+': {
    canDonateTo: ['B+'],
    canReceiveFrom: ['O-', 'O+', 'B-', 'B+']
  },
  'AB-': {
    canDonateTo: ['AB-', 'AB+'],
    canReceiveFrom: ['O-', 'A-', 'B-', 'AB-']
  },
  'AB+': {
    canDonateTo: ['AB+'],
    canReceiveFrom: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+']
  }
};

// Rh factor inheritance rules
const RhCompatibility = {
  'positive': {
    canReceiveFrom: ['positive', 'negative']
  },
  'negative': {
    canReceiveFrom: ['negative']
  }
};

/**
 * Check if a donor blood group is compatible with a recipient
 * @param {string} donorGroup - Donor's blood group (e.g., 'O+')
 * @param {string} recipientGroup - Recipient's blood group (e.g., 'AB+')
 * @returns {boolean} - True if compatible
 */
function isCompatible(donorGroup, recipientGroup) {
  if (!COMPATIBILITY_MATRIX[donorGroup] || !COMPATIBILITY_MATRIX[recipientGroup]) {
    return false;
  }

  return COMPATIBILITY_MATRIX[donorGroup].canDonateTo.includes(recipientGroup);
}

/**
 * Get all compatible blood groups for a given blood type
 * @param {string} bloodGroup - The blood group to find compatibles for
 * @param {boolean} forDonor - If true, return groups that can receive from this group
 * @returns {string[]} - Array of compatible blood groups
 */
function getCompatibleGroups(bloodGroup, forDonor = true) {
  if (!COMPATIBILITY_MATRIX[bloodGroup]) {
    return [];
  }

  return forDonor
    ? COMPATIBILITY_MATRIX[bloodGroup].canDonateTo
    : COMPATIBILITY_MATRIX[bloodGroup].canReceiveFrom;
}

/**
 * Get compatible donors for a specific blood type
 * @param {string} bloodGroup - The required blood group
 * @returns {string[]} - Blood groups that can donate
 */
function getCompatibleDonors(bloodGroup) {
  return getCompatibleGroups(bloodGroup, true);
}

/**
 * Validate blood group format
 * @param {string} bloodGroup - Blood group string to validate
 * @returns {boolean} - True if valid format
 */
function isValidBloodGroup(bloodGroup) {
  const validGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  return validGroups.includes(bloodGroup);
}

/**
 * Parse blood group string and return components
 * @param {string} bloodGroup - Blood group string (e.g., 'A+')
 * @returns {{type: string, rh: string}} - Blood type and Rh factor
 */
function parseBloodGroup(bloodGroup) {
  if (!isValidBloodGroup(bloodGroup)) {
    return null;
  }

  const rhIndex = bloodGroup.indexOf('+');
  if (rhIndex === -1) {
    return {
      type: bloodGroup,
      rh: '-'
    };
  }

  return {
    type: bloodGroup.substring(0, rhIndex),
    rh: '+'
  };
}

/**
 * Get Rh compatibility
 * @param {string} donorRh - Donor's Rh factor ('+' or '-')
 * @param {string} recipientRh - Recipient's Rh factor ('+' or '-')
 * @returns {boolean} - True if compatible
 */
function isRhCompatible(donorRh, recipientRh) {
  if (recipientRh === '+') {
    return donorRh === '+' || donorRh === '-';
  }
  return donorRh === '-';
}

/**
 * Check if a blood group is negative
 * @param {string} bloodGroup - Blood group to check
 * @returns {boolean} - True if negative
 */
function isNegative(bloodGroup) {
  return bloodGroup.endsWith('-');
}

/**
 * Get Rh factor from blood group
 * @param {string} bloodGroup - Blood group string
 * @returns {string} - '+' or '-'
 */
function getRhFactor(bloodGroup) {
  return bloodGroup.includes('-') ? '-' : '+';
}

/**
 * Calculate compatibility score for dispatcher
 * Higher score = more suitable match
 * @param {Object} options - Compatibility criteria
 * @returns {number} - Score between 0-100
 */
function calculateCompatibilityScore({
  donorGroup,
  requiredGroup,
  distanceKm,
  urgency,
  componentMatch,
  stockAvailable,
  verificationStatus
}) {
  let score = 0;

  // Perfect blood group match (100 points)
  if (donorGroup === requiredGroup) {
    score += 40;
  } else if (isCompatible(donorGroup, requiredGroup)) {
    score += 30;
  } else {
    return 0; // Not compatible at all
  }

  // Component match (15 points)
  if (componentMatch) {
    score += 15;
  }

  // Stock availability (10 points)
  if (stockAvailable) {
    score += 10;
  }

  // Verification status (10 points)
  if (verificationStatus === 'verified') {
    score += 10;
  }

  // Distance penalty (closer is better, max 25 points)
  if (distanceKm <= 5) {
    score += 25;
  } else if (distanceKm <= 10) {
    score += 20;
  } else if (distanceKm <= 20) {
    score += 15;
  } else if (distanceKm <= 50) {
    score += 10;
  } else {
    score += 5;
  }

  // Urgency bonus (critical requests get priority)
  if (urgency === 'critical') {
    score += 5;
  }

  return score;
}

module.exports = {
  isCompatible,
  getCompatibleGroups,
  getCompatibleDonors,
  isValidBloodGroup,
  parseBloodGroup,
  isRhCompatible,
  isNegative,
  getRhFactor,
  calculateCompatibilityScore,
  COMPATIBILITY_MATRIX
};