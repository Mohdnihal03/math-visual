import PythagoreanScene from './pythagorean/Scene'
import TrigonometryScene from './trigonometry/Scene'
import QuadraticScene from './quadratic/Scene'
import SphereScene from './sphere/Scene'
import CylinderScene from './cylinder/Scene'
import LinearScene from './linear/Scene'
import TriangleScene from './triangle/Scene'
import DerivativesScene from './derivatives/Scene'
import FibonacciScene from './fibonacci/Scene'
import IntegrationScene from './integration/Scene'
import CoordinateGeometryScene from './coordinate-geometry/Scene'
import ConeScene from './cone/Scene'
import QuadrilateralsScene from './quadrilaterals/Scene'
import CirclesScene from './circles/Scene'
import NumberSystemsScene from './number-systems/Scene'
import StatisticsScene from './statistics/Scene'

export const topics = [
  {
    id: 'pythagorean',
    title: 'Pythagorean Theorem',
    category: 'Geometry',
    difficulty: 'Beginner',
    icon: '📐',
    formulaPreview: 'a² + b² = c²',
    description: 'Discover the relationship between the sides of a right triangle through interactive 3D squares.',
    explanation:
      'The Pythagorean Theorem states that in any right triangle, the square of the hypotenuse (the longest side, opposite the right angle) equals the sum of the squares of the other two sides. This fundamental theorem connects algebra and geometry and has hundreds of real-world applications. Beyond triangles, the theorem is the foundation for finding the distance between two points in a 2D or 3D coordinate system (the distance formula). It also extends to higher dimensions in linear algebra, where it defines the norm or length of a vector.',
    applications: [
      'Construction: Checking if a corner is square (3-4-5 rule).',
      'Navigation: Calculating shortest distance between two points.',
      'Screen Size: TV and monitor sizes are the diagonal length.',
    ],
    controls: [
      { id: 'a', label: 'Side a', min: 1, max: 8, step: 0.1, defaultValue: 3, unit: 'units' },
      { id: 'b', label: 'Side b', min: 1, max: 8, step: 0.1, defaultValue: 4, unit: 'units' },
    ],
    challenges: [
      { question: 'Can you find a combination of side a and side b where the hypotenuse is exactly 5?' },
      { question: 'Make side a and side b equal. What kind of triangle is this?', hint: 'An isosceles right triangle!' },
    ],
    tips: 'Look for Pythagorean triplets like 3-4-5 and 5-12-13 to save time in calculations!',
    compute: (v) => {
      const c = Math.sqrt(v.a * v.a + v.b * v.b)
      return {
        'Hypotenuse c': c,
        'a²': v.a * v.a,
        'b²': v.b * v.b,
        'c²': c * c,
      }
    },
    formulas: [
      { label: 'Pythagorean Theorem', latex: 'a^2 + b^2 = c^2' },
      { label: 'Finding the hypotenuse', latex: 'c = \\sqrt{a^2 + b^2}' },
      { label: 'Finding a missing leg', latex: 'a = \\sqrt{c^2 - b^2}' },
    ],
    proofSteps: [
      { text: 'Start with a right triangle with legs a, b and hypotenuse c.', latex: '\\text{Right } \\triangle \\text{ with legs } a, b \\text{ and hypotenuse } c' },
      { text: 'Build a square on each side. The blue square has area a², red has b², green has c².', latex: 'A_{blue} = a^2, \\quad A_{red} = b^2, \\quad A_{green} = c^2' },
      { text: 'Place four identical triangles inside a large square of side (a+b). The area of the large square is (a+b)².', latex: '(a+b)^2 = a^2 + 2ab + b^2' },
      { text: 'The four triangles together have area 2ab. The remaining inner square has area c².', latex: '(a+b)^2 = 4 \\cdot \\tfrac{1}{2}ab + c^2 = 2ab + c^2' },
      { text: 'Setting the two expressions equal and simplifying proves the theorem.', latex: 'a^2 + 2ab + b^2 = 2ab + c^2 \\implies a^2 + b^2 = c^2' },
    ],
    Scene: PythagoreanScene,
  },

  {
    id: 'trigonometry',
    title: 'Unit Circle',
    category: 'Geometry',
    difficulty: 'Intermediate',
    icon: '🔄',
    formulaPreview: 'sin²θ + cos²θ = 1',
    description: 'Visualize sine, cosine, and tangent as geometric lengths on the unit circle.',
    explanation:
      'The unit circle is a circle with radius 1 centered at the origin. For any angle θ, the point on the circle has coordinates (cos θ, sin θ). This elegant definition gives us sine and cosine as the x and y coordinates, and tangent as the slope of the radius line. The Pythagorean identity sin²θ + cos²θ = 1 follows directly from the circle equation x² + y² = 1. The unit circle bridges the gap between static right triangles and periodic functions. As the angle grows beyond 90 degrees, the functions repeat, creating waves that describe everything from sound and light to ocean tides and planetary orbits.',
    applications: [
      'Architecture: Calculating heights of buildings or mountains.',
      'Music & Sound: Sound waves are modeled using sine and cosine waves.',
      'Astronomy: Measuring distance to stars.',
    ],
    controls: [
      { id: 'angle', label: 'Angle θ', min: 0, max: 360, step: 1, defaultValue: 45, unit: 'degrees' },
    ],
    challenges: [
      { question: 'At what angle does the sine value become equal to the cosine value?' },
      { question: 'Find an angle where the tangent value is undefined or extremely large.', hint: 'Try angles close to 90 or 270 degrees.' },
    ],
    tips: 'SOH CAH TOA! Sine = Opposite/Hypotenuse, Cosine = Adjacent/Hypotenuse, Tangent = Opposite/Adjacent.',
    compute: (v) => {
      const r = (v.angle * Math.PI) / 180
      return {
        'sin θ': Math.sin(r),
        'cos θ': Math.cos(r),
        'tan θ': Math.abs(Math.tan(r)) < 100 ? Math.tan(r) : undefined,
        'sin²+cos²': Math.sin(r) ** 2 + Math.cos(r) ** 2,
      }
    },
    formulas: [
      { label: 'Pythagorean identity', latex: '\\sin^2\\theta + \\cos^2\\theta = 1' },
      { label: 'Tangent definition', latex: '\\tan\\theta = \\dfrac{\\sin\\theta}{\\cos\\theta}' },
      { label: 'Point on unit circle', latex: 'P = (\\cos\\theta,\\ \\sin\\theta)' },
    ],
    proofSteps: [
      { text: 'The unit circle has equation x² + y² = 1.', latex: 'x^2 + y^2 = 1' },
      { text: 'A point P on the circle at angle θ has coordinates (cos θ, sin θ) by definition.', latex: 'P = (\\cos\\theta, \\sin\\theta)' },
      { text: 'Substitute into the circle equation.', latex: '\\cos^2\\theta + \\sin^2\\theta = 1' },
      { text: 'This is the fundamental Pythagorean identity, valid for all angles.', latex: '\\therefore \\sin^2\\theta + \\cos^2\\theta = 1 \\quad \\forall \\theta' },
    ],
    Scene: TrigonometryScene,
  },

  {
    id: 'quadratic',
    title: 'Quadratic Equations',
    category: 'Algebra',
    difficulty: 'Intermediate',
    icon: '⛰️',
    formulaPreview: 'ax² + bx + c = 0',
    description: 'Explore how changing coefficients reshapes the parabola and moves its roots.',
    explanation:
      'A quadratic equation ax² + bx + c = 0 always graphs as a parabola. The discriminant (b² - 4ac) tells you how many real solutions exist: positive means two roots, zero means one, negative means none. The vertex is the turning point of the parabola, and the axis of symmetry passes through it vertically. The shape of the parabola is also the path of a projectile under gravity (neglecting air resistance). The point of symmetry where the curve turns is the vertex, representing the maximum or minimum value of the function.',
    applications: [
      'Physics: Trajectory of a ball or rocket (projectile motion).',
      'Business: Calculating maximum profit or break-even points.',
      'Optics: Satellite dishes are parabolic to focus signals.',
    ],
    controls: [
      { id: 'a', label: 'Coefficient a', min: -3, max: 3, step: 0.1, defaultValue: 1 },
      { id: 'b', label: 'Coefficient b', min: -6, max: 6, step: 0.1, defaultValue: 0 },
      { id: 'c', label: 'Coefficient c', min: -8, max: 8, step: 0.1, defaultValue: -4 },
    ],
    challenges: [
      { question: 'Adjust the coefficients so that the parabola just touches the x-axis at exactly one point.', hint: 'The discriminant must be 0.' },
      { question: "Make coefficient 'a' negative. What happens to the shape of the parabola?", hint: 'It opens downwards!' },
    ],
    compute: (v) => {
      const disc = v.b * v.b - 4 * v.a * v.c
      const vx = v.a !== 0 ? -v.b / (2 * v.a) : 0
      const vy = v.a !== 0 ? v.c - v.b * v.b / (4 * v.a) : v.c
      return {
        'Discriminant Δ': disc,
        'Vertex x': vx,
        'Vertex y': vy,
        'Real roots': disc > 0 ? 2 : disc === 0 ? 1 : 0,
      }
    },
    formulas: [
      { label: 'Standard form', latex: 'f(x) = ax^2 + bx + c' },
      { label: 'Quadratic formula', latex: 'x = \\dfrac{-b \\pm \\sqrt{b^2-4ac}}{2a}' },
      { label: 'Discriminant', latex: '\\Delta = b^2 - 4ac' },
      { label: 'Vertex formula', latex: 'x_v = -\\dfrac{b}{2a}, \\quad y_v = c - \\dfrac{b^2}{4a}' },
    ],
    proofSteps: [
      { text: 'Start with the standard form and move c to the right side.', latex: 'ax^2 + bx = -c' },
      { text: 'Divide through by a.', latex: 'x^2 + \\dfrac{b}{a}x = -\\dfrac{c}{a}' },
      { text: 'Complete the square by adding (b/2a)² to both sides.', latex: 'x^2 + \\dfrac{b}{a}x + \\dfrac{b^2}{4a^2} = \\dfrac{b^2-4ac}{4a^2}' },
      { text: 'Factor the left side as a perfect square.', latex: '\\left(x + \\dfrac{b}{2a}\\right)^2 = \\dfrac{b^2-4ac}{4a^2}' },
      { text: 'Take the square root and solve for x.', latex: 'x = \\dfrac{-b \\pm \\sqrt{b^2-4ac}}{2a}' },
    ],
    Scene: QuadraticScene,
  },

  {
    id: 'sphere',
    title: 'Volume of Sphere',
    category: 'Geometry',
    difficulty: 'Beginner',
    icon: '🌐',
    formulaPreview: 'V = 4/3 πr³',
    description: 'See how the sphere grows and calculate volume and surface area with a live 3D model.',
    explanation:
      'A sphere is a perfectly round 3D shape where every point on the surface is the same distance (the radius r) from the center. The volume formula V = (4/3)πr³ was first proved by Archimedes, who was so proud of this discovery that he asked for a sphere inscribed in a cylinder to be carved on his tomb. This formula can be derived using calculus by integrating the area of circular cross-sections (disks) or by using Cavalieri\'s Principle comparing the sphere to a cylinder with a cone removed.',
    applications: [
      'Geography: Modeling the Earth and other planets.',
      'Sports: Designing balls (soccer, basketball) for optimal performance.',
      'Meteorology: Weather balloons and atmospheric models.',
    ],
    controls: [
      { id: 'r', label: 'Radius r', min: 0.5, max: 4, step: 0.1, defaultValue: 2, unit: 'units' },
    ],
    challenges: [
      { question: 'Double the radius from 1 to 2. By how much does the volume increase?', hint: 'It increases by 8 times (2³).' },
      { question: 'Find the radius that gives a volume closest to 100.' },
    ],
    compute: (v) => ({
      'Volume V': (4 / 3) * Math.PI * v.r ** 3,
      'Surface Area': 4 * Math.PI * v.r ** 2,
      Diameter: 2 * v.r,
    }),
    formulas: [
      { label: 'Volume', latex: 'V = \\dfrac{4}{3}\\pi r^3' },
      { label: 'Surface Area', latex: 'SA = 4\\pi r^2' },
      { label: 'Diameter', latex: 'd = 2r' },
    ],
    proofSteps: [
      { text: 'Consider a sphere of radius r. We integrate the area of horizontal discs from -r to r.', latex: 'V = \\int_{-r}^{r} \\pi(r^2 - y^2)\\, dy' },
      { text: 'Expand and split the integral.', latex: 'V = \\pi \\int_{-r}^{r} (r^2 - y^2)\\, dy' },
      { text: 'Evaluate the integral.', latex: 'V = \\pi \\left[r^2 y - \\dfrac{y^3}{3}\\right]_{-r}^{r}' },
      { text: 'Substitute limits and simplify.', latex: 'V = \\pi \\left(r^3 - \\dfrac{r^3}{3} + r^3 - \\dfrac{r^3}{3}\\right) = \\dfrac{4}{3}\\pi r^3' },
    ],
    Scene: SphereScene,
  },

  {
    id: 'cylinder',
    title: 'Volume of Cylinder',
    category: 'Geometry',
    difficulty: 'Beginner',
    icon: '🥫',
    formulaPreview: 'V = πr²h',
    description: 'Interactively resize a 3D cylinder and compute its volume and surface area instantly.',
    explanation:
      'A cylinder is a 3D shape with two parallel circular bases connected by a curved surface. Its volume is simply the area of the circular base (πr²) multiplied by the height h. Think of it as stacking an infinite number of infinitely thin circular discs from the bottom to the top. The surface area includes the two circular bases and the rectangular area formed if you were to "unroll" the curved side.',
    applications: [
      'Manufacturing: Cans, pipes, and rollers.',
      'Construction: Pillars and columns in buildings.',
      'Biology: Modeling cells and tree trunks.',
    ],
    controls: [
      { id: 'r', label: 'Radius r', min: 0.5, max: 4, step: 0.1, defaultValue: 2, unit: 'units' },
      { id: 'h', label: 'Height h', min: 0.5, max: 8, step: 0.1, defaultValue: 4, unit: 'units' },
    ],
    challenges: [
      { question: 'Keep the volume the same while making the cylinder taller and thinner.' },
      { question: 'What happens to the volume if you double the radius but halve the height?', hint: 'The volume doubles!' },
    ],
    compute: (v) => ({
      'Volume V': Math.PI * v.r ** 2 * v.h,
      'Lateral SA': 2 * Math.PI * v.r * v.h,
      'Total SA': 2 * Math.PI * v.r * (v.r + v.h),
    }),
    formulas: [
      { label: 'Volume', latex: 'V = \\pi r^2 h' },
      { label: 'Lateral Surface Area', latex: 'LSA = 2\\pi r h' },
      { label: 'Total Surface Area', latex: 'TSA = 2\\pi r(r + h)' },
    ],
    proofSteps: [
      { text: 'The base of the cylinder is a circle with area πr².', latex: 'A_{base} = \\pi r^2' },
      { text: 'The cylinder is formed by stacking circular discs of area πr² up to height h.', latex: 'V = A_{base} \\times h' },
      { text: 'Therefore the volume is πr²h.', latex: 'V = \\pi r^2 h' },
      { text: 'The lateral surface unfolds into a rectangle of width 2πr (circumference) and height h.', latex: 'LSA = 2\\pi r \\times h = 2\\pi r h' },
      { text: 'Adding both circular caps gives the total surface area.', latex: 'TSA = 2\\pi r h + 2\\pi r^2 = 2\\pi r(r+h)' },
    ],
    Scene: CylinderScene,
  },

  {
    id: 'linear',
    title: 'Linear Equations',
    category: 'Algebra',
    difficulty: 'Beginner',
    icon: '📈',
    formulaPreview: 'y = mx + b',
    description: 'Control slope and y-intercept to see how a line changes direction and position.',
    explanation:
      'A linear equation y = mx + b describes a straight line. m is the slope (rise over run — how steeply the line climbs or falls) and b is the y-intercept (where the line crosses the y-axis). Every straight-line relationship in the real world — speed, cost, temperature conversion — follows this form. The concept of slope is fundamental to calculus, where it is extended to find the rate of change for curves.',
    applications: [
      'Finance: Budgeting and calculating costs (e.g., cell phone plans).',
      'Speed & Distance: Calculating travel time.',
      'Recipe Scaling: Multiplying ingredients proportionally.',
    ],
    controls: [
      { id: 'm', label: 'Slope m', min: -4, max: 4, step: 0.1, defaultValue: 1 },
      { id: 'b', label: 'Y-intercept b', min: -6, max: 6, step: 0.5, defaultValue: 0 },
    ],
    challenges: [
      { question: 'Make the line parallel to the x-axis. What is the slope?', hint: 'The slope must be 0.' },
      { question: 'Make the line pass through the origin. What must the y-intercept be?', hint: 'The y-intercept (b) must be 0.' },
    ],
    compute: (v) => ({
      'Slope m': v.m,
      'Y-intercept': v.b,
      'X-intercept': v.m !== 0 ? -v.b / v.m : undefined,
      'Angle (°)': (Math.atan(v.m) * 180) / Math.PI,
    }),
    formulas: [
      { label: 'Slope-intercept form', latex: 'y = mx + b' },
      { label: 'Slope definition', latex: 'm = \\dfrac{\\text{rise}}{\\text{run}} = \\dfrac{\\Delta y}{\\Delta x}' },
      { label: 'X-intercept', latex: 'x_{int} = -\\dfrac{b}{m}' },
    ],
    proofSteps: [
      { text: 'A straight line has constant slope — any two points give the same rise/run ratio.', latex: 'm = \\dfrac{y_2 - y_1}{x_2 - x_1}' },
      { text: 'For a point (x, y) on the line, the slope from (0, b) to (x, y) equals m.', latex: 'm = \\dfrac{y - b}{x - 0}' },
      { text: 'Multiply both sides by x and rearrange.', latex: 'mx = y - b \\implies y = mx + b' },
    ],
    Scene: LinearScene,
  },

  {
    id: 'triangle',
    title: 'Area of Triangle',
    category: 'Geometry',
    difficulty: 'Beginner',
    icon: '🔺',
    formulaPreview: 'A = ½ × b × h',
    description: 'Resize the base and height of a triangle and watch its area update live in 3D.',
    explanation:
      'The area of any triangle is half the product of its base and perpendicular height. This formula works for all triangles — acute, obtuse, or right-angled — as long as you measure the height perpendicular to the chosen base. It\'s derived from the fact that every triangle is exactly half of a parallelogram. Heron\'s formula is an alternative that allows calculating the area when only the side lengths are known, without knowing the height.',
    applications: [
      'Construction: Trusses in roofs and bridges (triangles are rigid).',
      'Art & Design: Perspective and composition.',
      'Surveying: Triangulation to measure distances.',
    ],
    controls: [
      { id: 'base', label: 'Base b', min: 1, max: 10, step: 0.5, defaultValue: 6, unit: 'units' },
      { id: 'height', label: 'Height h', min: 1, max: 8, step: 0.5, defaultValue: 4, unit: 'units' },
    ],
    challenges: [
      { question: 'Make the area exactly 12 by changing base and height.' },
      { question: 'What happens to the area if you double both the base and the height?', hint: 'The area increases by 4 times!' },
    ],
    compute: (v) => ({
      'Area A': 0.5 * v.base * v.height,
      'Perimeter ≈': v.base + 2 * Math.sqrt((v.base / 2) ** 2 + v.height ** 2),
    }),
    formulas: [
      { label: 'Area of a triangle', latex: 'A = \\dfrac{1}{2} \\times b \\times h' },
      { label: 'Alternative (Heron\'s formula)', latex: 'A = \\sqrt{s(s-a)(s-b)(s-c)}, \\quad s = \\dfrac{a+b+c}{2}' },
    ],
    proofSteps: [
      { text: 'Take the triangle with base b and height h.', latex: '\\triangle \\text{ with base } b \\text{ and height } h' },
      { text: 'Duplicate it and flip it. The two triangles form a parallelogram of base b and height h.', latex: 'A_{parallelogram} = b \\times h' },
      { text: 'The triangle is exactly half of the parallelogram.', latex: 'A_{\\triangle} = \\dfrac{1}{2} \\times b \\times h' },
    ],
    Scene: TriangleScene,
  },

  {
    id: 'derivatives',
    title: 'Derivatives',
    category: 'Calculus',
    difficulty: 'Advanced',
    icon: '📉',
    formulaPreview: "f'(x) = 2x",
    description: "Move a point along y = x² and watch the tangent line reveal the instantaneous slope.",
    explanation:
      "The derivative f'(x) measures the instantaneous rate of change of f at x — it's the slope of the tangent line at that exact point. For f(x) = x², the derivative is f'(x) = 2x. This means at x = 3, the curve is rising at a slope of 6. At x = 0 (the vertex), slope is 0 — the curve is momentarily flat. This concept is the foundation of calculus and is used to optimize functions (finding maximums and minimums) across all fields of science and economics.",
    applications: [
      'Physics: Calculating velocity and acceleration.',
      'Economics: Marginal cost and revenue analysis.',
      'Biology: Rate of population growth.',
    ],
    controls: [
      { id: 'x', label: 'x value', min: -4, max: 4, step: 0.1, defaultValue: 1.5 },
    ],
    compute: (v) => ({
      'f(x) = x²': v.x * v.x,
      "f'(x) = 2x": 2 * v.x,
      'Tangent slope': 2 * v.x,
    }),
    formulas: [
      { label: 'Function', latex: 'f(x) = x^2' },
      { label: 'Derivative (power rule)', latex: "f'(x) = 2x" },
      { label: 'Tangent line at x₀', latex: 'y = f(x_0) + f\'(x_0)(x - x_0)' },
      { label: 'Limit definition', latex: "f'(x) = \\lim_{h \\to 0} \\dfrac{f(x+h)-f(x)}{h}" },
    ],
    proofSteps: [
      { text: 'Apply the limit definition of the derivative to f(x) = x².', latex: "f'(x) = \\lim_{h \\to 0} \\dfrac{(x+h)^2 - x^2}{h}" },
      { text: 'Expand (x+h)².', latex: '= \\lim_{h \\to 0} \\dfrac{x^2 + 2xh + h^2 - x^2}{h}' },
      { text: 'Simplify the numerator.', latex: '= \\lim_{h \\to 0} \\dfrac{2xh + h^2}{h}' },
      { text: 'Factor out h and cancel.', latex: '= \\lim_{h \\to 0} (2x + h)' },
      { text: 'Take the limit as h → 0.', latex: "f'(x) = 2x" },
    ],
    Scene: DerivativesScene,
  },

  {
    id: 'fibonacci',
    title: 'Fibonacci Sequence',
    category: 'Algebra',
    difficulty: 'Beginner',
    icon: '🌀',
    formulaPreview: 'Fₙ = Fₙ₋₁ + Fₙ₋₂',
    description: 'Explore the growth of the Fibonacci sequence and its spiral.',
    explanation: 'The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones, usually starting with 0 and 1. This simple rule creates a sequence that appears frequently in nature (leaf arrangements, spiral galaxies) and is closely related to the Golden Ratio (≈1.618). Visualizing it as growing squares creates the famous Fibonacci Spiral. The ratio of consecutive Fibonacci numbers approaches the Golden Ratio as the numbers get larger.',
    applications: [
      'Nature: Arrangement of leaves, sunflower seeds, and pinecones.',
      'Art & Architecture: Golden ratio proportions.',
      'Computer Science: Search algorithms and data structures.',
    ],
    controls: [
      { id: 'n', label: 'Sequence Length', min: 2, max: 10, step: 1, defaultValue: 6 },
    ],
    compute: (v) => {
      const n = Math.floor(v.n || 6)
      const fib = [1, 1]
      for (let i = 2; i < n; i++) {
        fib.push(fib[i - 1] + fib[i - 2])
      }
      return {
        'Current Value': fib[n - 1],
        'Previous Value': fib[n - 2],
        'Ratio': n > 2 ? fib[n - 1] / fib[n - 2] : 1,
      }
    },
    formulas: [
      { label: 'Recurrence relation', latex: 'F_n = F_{n-1} + F_{n-2}' },
      { label: 'Golden Ratio limit', latex: '\\lim_{n \\to \\infty} \\dfrac{F_n}{F_{n-1}} = \\phi \\approx 1.618' },
    ],
    proofSteps: [
      { text: 'Start with 1 and 1.', latex: 'F_1 = 1, \\quad F_2 = 1' },
      { text: 'Add them to get the next number.', latex: 'F_3 = 1 + 1 = 2' },
      { text: 'Continue the pattern.', latex: 'F_4 = 2 + 1 = 3, \\quad F_5 = 3 + 2 = 5' },
      { text: 'The sequence grows exponentially.', latex: 'F_n = \\dfrac{\\phi^n - (1-\\phi)^n}{\\sqrt{5}}' },
    ],
    Scene: FibonacciScene,
  },

  {
    id: 'integration',
    title: 'Integration',
    category: 'Calculus',
    difficulty: 'Advanced',
    icon: '📊',
    formulaPreview: '∫ f(x) dx',
    description: 'Visualize area under a curve as the sum of infinitely many rectangles.',
    explanation: 'Integration is the process of finding the total accumulation of a quantity, such as area under a curve, distance traveled, or volume. It can be visualized as dividing the area under a curve into an infinite number of infinitely thin rectangles and summing their areas (Riemann Sums). This fundamental concept connects differentiation and summation through the Fundamental Theorem of Calculus. As you increase the number of rectangles, the approximation becomes exact.',
    applications: [
      'Physics: Calculating center of mass and work done.',
      'Engineering: Finding areas under curves for structures.',
      'Probability: Calculating probabilities in continuous distributions.',
    ],
    controls: [
      { id: 'rectangles', label: 'Number of Rectangles', min: 2, max: 50, step: 1, defaultValue: 10 },
    ],
    compute: (v) => {
      const rects = Math.floor(v.rectangles || 10)
      const width = 10 / rects
      let area = 0
      for (let i = 0; i < rects; i++) {
        const x = -5 + i * width + width / 2
        area += (Math.sin(x) + 2) * width
      }
      return {
        'Rectangles': rects,
        'Approx Area': area,
        'Exact Area': 20,
      }
    },
    formulas: [
      { label: 'Definite Integral', latex: '\\int_{a}^{b} f(x)\\, dx' },
      { label: 'Riemann Sum', latex: '\\sum_{i=1}^{n} f(x_i^*)\\, \\Delta x' },
    ],
    proofSteps: [
      { text: 'Divide the interval [a, b] into n subintervals of width Δx.', latex: '\\Delta x = \\dfrac{b-a}{n}' },
      { text: 'Choose a point x* in each subinterval and evaluate the function.', latex: 'f(x_i^*)' },
      { text: 'Sum the areas of the n rectangles.', latex: 'A_n = \\sum_{i=1}^{n} f(x_i^*)\\, \\Delta x' },
      { text: 'Take the limit as n approaches infinity to get the exact area.', latex: '\\int_{a}^{b} f(x)\\, dx = \\lim_{n \\to \\infty} \\sum_{i=1}^{n} f(x_i^*)\\, \\Delta x' },
    ],
    Scene: IntegrationScene,
  },
  {
    id: 'coordinate-geometry',
    title: 'Coordinate Geometry',
    category: 'Geometry',
    difficulty: 'Beginner',
    icon: '📍',
    formulaPreview: 'P(x, y)',
    description: 'Understand the Cartesian plane, plot points, and identify quadrants.',
    explanation:
      'Coordinate geometry bridges the gap between algebra and geometry. The Cartesian plane consists of two perpendicular axes: the x-axis (horizontal) and the y-axis (vertical), intersecting at the origin (0,0). \n\n💡 Tip: Remember quadrant signs! I (+,+), II (-,+), III (-,-), IV (+,-). Also, the x-coordinate is the distance from the Y-axis, and the y-coordinate is the distance from the X-axis.',
    applications: [
      'GPS and Navigation: Google Maps uses coordinates to find your location.',
      'Computer Gaming: Every pixel on a screen has an (x, y) coordinate.',
      'Aviation: Pilots use coordinate systems to navigate without roads.',
    ],
    controls: [
      { id: 'x', label: 'X Coordinate', min: -5, max: 5, step: 0.5, defaultValue: 2 },
      { id: 'y', label: 'Y Coordinate', min: -5, max: 5, step: 0.5, defaultValue: 3 },
    ],
    compute: (v) => {
      const getQuadrant = (x, y) => {
        if (x > 0 && y > 0) return 'I'
        if (x < 0 && y > 0) return 'II'
        if (x < 0 && y < 0) return 'III'
        if (x > 0 && y < 0) return 'IV'
        if (x === 0 && y !== 0) return 'Y-Axis'
        if (y === 0 && x !== 0) return 'X-Axis'
        return 'Origin'
      }
      return {
        'Quadrant': getQuadrant(v.x, v.y),
        'Distance from Origin': Math.sqrt(v.x * v.x + v.y * v.y).toFixed(2),
      }
    },
    formulas: [
      { label: 'Point representation', latex: 'P = (x, y)' },
      { label: 'Distance from origin', latex: 'd = \\sqrt{x^2 + y^2}' },
    ],
    proofSteps: [
      { text: 'Start at the origin (0,0).', latex: '(0,0)' },
      { text: 'Move x units along the horizontal axis.', latex: 'x \\text{ units}' },
      { text: 'Move y units along the vertical axis.', latex: 'y \\text{ units}' },
      { text: 'The final position is the point (x, y).', latex: 'P(x, y)' },
    ],
    Scene: CoordinateGeometryScene,
  },
  {
    id: 'cone',
    title: 'Volume of Cone',
    category: 'Geometry',
    difficulty: 'Beginner',
    icon: '🍦',
    formulaPreview: 'V = 1/3 πr²h',
    description: 'Visualize how a cone relates to a cylinder and calculate its volume.',
    explanation:
      'A cone is a 3D shape with a circular base tapering to a point. The volume of a cone is exactly one-third the volume of a cylinder with the same base radius and height. \n\n💡 Tip: If you remember the cylinder volume (πr²h), just divide by 3 for the cone! Also, radius (r), height (h), and slant height (l) always form a right triangle: l² = r² + h².',
    applications: [
      'Ice Cream Cones & Funnels: Designed based on volume formulas.',
      'Rocket Science: Rocket nose cones are designed to reduce air resistance.',
      'Construction: Conical shapes are used in silos for grain storage.',
    ],
    controls: [
      { id: 'r', label: 'Radius r', min: 0.5, max: 4, step: 0.1, defaultValue: 2, unit: 'units' },
      { id: 'h', label: 'Height h', min: 0.5, max: 8, step: 0.1, defaultValue: 4, unit: 'units' },
    ],
    challenges: [
      { question: 'Can you adjust the radius and height to make the volume exactly 50?' },
      { question: 'What happens to the volume if you double the radius but keep the height the same?', hint: 'The volume increases by 4x!' },
    ],
    tips: 'A cone is exactly 1/3 of a cylinder. If you know the cylinder formula (πr²h), just divide by 3!',
    compute: (v) => {
      const l = Math.sqrt(v.r * v.r + v.h * v.h)
      return {
        'Volume V': (1 / 3) * Math.PI * v.r ** 2 * v.h,
        'Slant Height l': l,
        'Curved SA': Math.PI * v.r * l,
        'Total SA': Math.PI * v.r * (v.r + l),
      }
    },
    formulas: [
      { label: 'Volume', latex: 'V = \\dfrac{1}{3}\\pi r^2 h' },
      { label: 'Slant Height', latex: 'l = \\sqrt{r^2 + h^2}' },
      { label: 'Curved Surface Area', latex: 'CSA = \\pi r l' },
      { label: 'Total Surface Area', latex: 'TSA = \\pi r(r + l)' },
    ],
    proofSteps: [
      { text: 'Consider a cylinder and a cone with same radius r and height h.', latex: 'V_{cylinder} = \\pi r^2 h' },
      { text: 'The volume of the cone is one-third of the cylinder.', latex: 'V_{cone} = \\dfrac{1}{3} V_{cylinder}' },
      { text: 'Therefore the volume is 1/3 πr²h.', latex: 'V = \\dfrac{1}{3}\\pi r^2 h' },
      { text: 'The curved surface unfolds into a sector of a circle of radius l.', latex: 'CSA = \\pi r l' },
    ],
    Scene: ConeScene,
  },
  {
    id: 'quadrilaterals',
    title: 'Properties of Parallelograms',
    category: 'Geometry',
    difficulty: 'Intermediate',
    icon: '▱',
    formulaPreview: 'Area = b × h',
    description: 'Explore the properties of parallelograms and the mid-point theorem.',
    explanation:
      'A quadrilateral with both pairs of opposite sides parallel is called a parallelogram. \n\n💡 Tip: Think of shapes as a family tree! A parallelogram becomes a Rectangle if angles are 90°, a Rhombus if sides are equal, and a Square if both! Also, the Mid-point Theorem says joining mid-points of two triangle sides creates a line parallel to the base and half its length.',
    applications: [
      'Windshield Wipers: Use parallelogram linkages to keep blades parallel.',
      'Bridges and Architecture: Trusses often use parallelograms for strength.',
      'Tiling and Design: Used in flooring and wallpapers.',
    ],
    controls: [
      { id: 'base', label: 'Base', min: 2, max: 8, step: 0.5, defaultValue: 5 },
      { id: 'height', label: 'Height', min: 1, max: 6, step: 0.5, defaultValue: 3 },
      { id: 'skew', label: 'Skew', min: -3, max: 3, step: 0.5, defaultValue: 1 },
    ],
    compute: (v) => {
      return {
        'Area': v.base * v.height,
        'Perimeter ≈': 2 * (v.base + Math.sqrt(v.height * v.height + v.skew * v.skew)),
      }
    },
    formulas: [
      { label: 'Area of Parallelogram', latex: 'A = b \\times h' },
      { label: 'Mid-point Theorem', latex: 'EF = \\dfrac{1}{2}BC, \\quad EF \\parallel BC' },
    ],
    proofSteps: [
      { text: 'A diagonal divides a parallelogram into two congruent triangles.', latex: '\\triangle ABC \\cong \\triangle CDA' },
      { text: 'In a parallelogram opposite sides are equal.', latex: 'AB = CD, \\quad BC = DA' },
      { text: 'Opposite angles are equal.', latex: '\\angle A = \\angle C, \\quad \\angle B = \\angle D' },
      { text: 'Diagonals bisect each other.', latex: 'AO = OC, \\quad BO = OD' },
    ],
    Scene: QuadrilateralsScene,
  },
  {
    id: 'circles',
    title: 'Circle Theorems',
    category: 'Geometry',
    difficulty: 'Intermediate',
    icon: '⭕',
    formulaPreview: '∠AOB = 2∠APB',
    description: 'Visualize how the angle at the center is double the angle at the circumference.',
    explanation:
      'A circle is a set of all points in a plane that are at a given distance from a center. One of the key theorems in Class 9 is that the angle subtended by an arc at the center is double the angle subtended by it at any point on the remaining part of the circle. \n\n💡 Tip: No matter where you move point P on the major arc, the angle ∠APB stays exactly the same!',
    applications: [
      'Architecture: Designing domes and arches.',
      'Navigation: Using sextants to measure angles between stars and the horizon.',
      'Art & Design: Creating geometric patterns and mandalas.',
    ],
    controls: [
      { id: 'arcAngle', label: 'Central Angle', min: 20, max: 180, step: 5, defaultValue: 90 },
      { id: 'pAngle', label: 'Position of P', min: 100, max: 260, step: 5, defaultValue: 180 },
    ],
    compute: (v) => {
      return {
        'Central Angle ∠AOB': v.arcAngle,
        'Inscribed Angle ∠APB': v.arcAngle / 2,
      }
    },
    formulas: [
      { label: 'Circle Theorem', latex: '\\angle AOB = 2\\angle APB' },
    ],
    proofSteps: [
      { text: 'Join PO and produce it to a point Q.', latex: '\\text{Draw line } POQ' },
      { text: 'In triangle APO, OA = OP (radii). So, ∠OAP = ∠OPA.', latex: '\\triangle APO \\text{ is isosceles}' },
      { text: 'Exterior angle ∠AOQ = ∠OAP + ∠OPA = 2∠OPA.', latex: '\\text{Exterior angle theorem}' },
      { text: 'Similarly, for triangle BPO, exterior angle ∠BOQ = 2∠OPB.', latex: '\\angle BOQ = 2\\angle OPB' },
      { text: 'Adding the two gives ∠AOB = 2(∠OPA + ∠OPB) = 2∠APB.', latex: '\\angle AOB = 2\\angle APB' },
    ],
    Scene: CirclesScene,
  },
  {
    id: 'number-systems',
    title: 'Irrational Numbers',
    category: 'Algebra',
    difficulty: 'Intermediate',
    icon: '🌀',
    formulaPreview: '√2, √3, √5...',
    description: 'Visualize the square root spiral and how irrational numbers are plotted on a number line.',
    explanation:
      'Irrational numbers cannot be expressed as a simple fraction. The square root spiral (Spirals of Pythagoras) is a geometric method to construct lengths of square roots of consecutive natural numbers. \n\n💡 Tip: Each new triangle is a right triangle with base equal to the previous hypotenuse and height equal to 1. By Pythagoras theorem, the new hypotenuse is √(base² + 1²). So we get √2, √3, √4, √5...',
    applications: [
      'Geometry: Constructing precise lengths without measurement tools.',
      'Aesthetics: The spiral appears in natural growth patterns.',
      'Computer Science: Used in specific algorithms and fractal generation.',
    ],
    controls: [
      { id: 'steps', label: 'Spiral Steps', min: 1, max: 10, step: 1, defaultValue: 5 },
    ],
    compute: (v) => {
      return {
        'Steps': v.steps,
        'Max Length': `√${v.steps + 1}`,
      }
    },
    formulas: [
      { label: 'Pythagoras in Spiral', latex: 'h_n = \\sqrt{h_{n-1}^2 + 1}' },
    ],
    proofSteps: [
      { text: 'Start with a right triangle of sides 1 and 1. Hypotenuse is √2.', latex: 'h_1 = \\sqrt{1^2 + 1^2} = \\sqrt{2}' },
      { text: 'Build another right triangle on this hypotenuse with height 1.', latex: 'h_2 = \\sqrt{(\\sqrt{2})^2 + 1^2} = \\sqrt{3}' },
      { text: 'Repeat the process to get consecutive square roots.', latex: 'h_n = \\sqrt{n+1}' },
    ],
    Scene: NumberSystemsScene,
  },
  {
    id: 'statistics',
    title: 'Statistics (Central Tendency)',
    category: 'Statistics',
    difficulty: 'Beginner',
    icon: '📊',
    formulaPreview: 'Mean, Median, Mode',
    description: 'Understand Mean, Median, and Mode interactively with a live bar graph.',
    explanation:
      'Statistics is the study of the collection, analysis, interpretation, presentation, and organization of data. The three measures of central tendency are: \n\nMean: The average value. \nMedian: The middle value when sorted. \nMode: The most frequent value.',
    applications: [
      'Economics: Calculating average income and growth rates.',
      'Education: Analyzing student grades and performance.',
      'Business: Market research and predicting trends.',
    ],
    controls: [
      { id: 'v1', label: 'Data 1', min: 1, max: 10, step: 0.5, defaultValue: 5 },
      { id: 'v2', label: 'Data 2', min: 1, max: 10, step: 0.5, defaultValue: 7 },
      { id: 'v3', label: 'Data 3', min: 1, max: 10, step: 0.5, defaultValue: 4 },
      { id: 'v4', label: 'Data 4', min: 1, max: 10, step: 0.5, defaultValue: 8 },
      { id: 'v5', label: 'Data 5', min: 1, max: 10, step: 0.5, defaultValue: 6 },
    ],
    compute: (v) => {
      const data = [v.v1, v.v2, v.v3, v.v4, v.v5]
      const mean = data.reduce((a, b) => a + b, 0) / data.length
      const sortedData = [...data].sort((a, b) => a - b)
      const median = sortedData[2]

      const counts = {}
      data.forEach(x => counts[x] = (counts[x] || 0) + 1)
      let maxCount = 0
      let mode = null
      Object.entries(counts).forEach(([val, count]) => {
        if (count > maxCount) {
          maxCount = count
          mode = parseFloat(val)
        }
      })

      return {
        'Mean': mean.toFixed(2),
        'Median': median,
        'Mode': maxCount > 1 ? mode : 'None',
      }
    },
    formulas: [
      { label: 'Mean formula', latex: '\\bar{x} = \\dfrac{\\sum x_i}{n}' },
      { label: 'Median (odd n)', latex: '\\text{Value at } \\dfrac{n+1}{2}\\text{th position}' },
    ],
    proofSteps: [
      { text: 'Collect the data points.', latex: 'x_1, x_2, ..., x_n' },
      { text: 'Sum all data points and divide by n to get the Mean.', latex: '\\bar{x} = \\dfrac{\\sum x_i}{n}' },
      { text: 'Arrange data in ascending order to find the Median.', latex: 'x_{(1)} \\le x_{(2)} \\le ... \\le x_{(n)}' },
      { text: 'Find the value that occurs most frequently to get the Mode.', latex: '\\text{Mode} = \\text{Most frequent } x_i' },
    ],
    Scene: StatisticsScene,
  }
]
