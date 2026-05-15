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
import RectangleScene from './rectangle/Scene'
import CuboidScene from './cuboid/Scene'
import HeronsFormulaScene from './herons-formula/Scene'
import ProbabilityScene from './probability/Scene'
import LinesAndAnglesScene from './lines-and-angles/Scene'

export const topics = [
  {
    id: 'pythagorean',
    title: 'Pythagorean Theorem',
    category: 'Geometry',
    difficulty: 'Beginner',
    icon: '📐',
    formulaPreview: 'a² + b² = c²',
    description: 'Understand the Pythagorean Theorem (a² + b² = c²) with an interactive 3D model — drag, rotate, and change side lengths to see the proof come alive.',
    explanation:
      'The Pythagorean Theorem states that in any right-angled triangle, the square of the hypotenuse (the longest side, opposite the right angle) equals the sum of the squares of the other two sides: a² + b² = c². This fundamental theorem is covered in CBSE Class 9 and Class 10. To score well in exams, you need to learn how to state the theorem correctly, identify the hypotenuse, and use the formula to find missing side lengths.',
    applications: [
      'Construction & Architecture: Engineers use the 3-4-5 rule to verify right angles in building foundations and room corners.',
      'Navigation & GPS: Calculating the shortest straight-line distance between two points on a map uses the Pythagorean theorem.',
      'Screen & Display Sizes: TV, laptop, and phone screen sizes are measured as the diagonal — calculated using a² + b² = c².',
      'Game Development: Distance between two characters or objects in a 2D/3D game world is computed using this theorem.',
      'Surveying & Land Measurement: Surveyors divide irregular land into right triangles to calculate distances without measuring directly.',
    ],
    controls: [
      { id: 'a', label: 'Side a', min: 1, max: 8, step: 0.1, defaultValue: 3, unit: 'units' },
      { id: 'b', label: 'Side b', min: 1, max: 8, step: 0.1, defaultValue: 4, unit: 'units' },
    ],
    challenges: [
      { question: 'Can you find a combination of side a and side b where the hypotenuse is exactly 5?', hint: 'Think of the most famous Pythagorean triplet!' },
      { question: 'Make side a and side b equal. What kind of triangle is this?', hint: 'An isosceles right triangle!' },
      { question: 'Find a Pythagorean triplet where the hypotenuse is 13.', hint: 'Try a = 5 and b = 12.' },
      { question: 'If a = 6 and c = 10, what must b be?', hint: 'Use b = √(c² − a²) = √(100 − 36) = 8.' },
    ],
    tips: 'Memorize common Pythagorean triplets: 3-4-5, 5-12-13, 8-15-17, 7-24-25. Any multiple of a triplet is also a triplet (e.g. 6-8-10). In CBSE board exams, these triplets save calculation time!',
    meta: {
      title: 'Pythagorean Theorem — Interactive 3D Proof | Class 9 & 10 CBSE Math | Ganith Society',
      description: 'Understand the Pythagorean Theorem with a live 3D model. Change side lengths, see area squares, and walk through the proof step by step. CBSE & NCERT Class 9 aligned. Free on Ganith Society.',
    },
    faq: [
      { q: 'What is the Pythagorean Theorem?', a: 'It states that in a right triangle, the square of the hypotenuse equals the sum of the squares of the other two sides: a² + b² = c².' },
      { q: 'Which CBSE class covers the Pythagorean Theorem?', a: 'It is introduced in Class 9 (Chapter 7 — Triangles) and extended with proofs in Class 10 (Chapter 6 — Triangles) as per NCERT.' },
      { q: 'How does Ganith Society help me learn this?', a: 'Our interactive 3D model lets you drag sliders to change side lengths and watch the squares on each side update in real time — making the proof visual and intuitive.' },
      { q: 'What are Pythagorean triplets?', a: 'Sets of three whole numbers that satisfy a² + b² = c², such as 3-4-5, 5-12-13, and 8-15-17.' },
      { q: 'Is this useful for board exams?', a: 'Absolutely — the Pythagorean Theorem is a guaranteed topic in CBSE board exams and frequently appears in competitive exams like NTSE and Olympiads.' },
    ],
    benefits: [
      'Helps you visualize the area squares on each side, making the formula a² + b² = c² easy to understand instead of just memorizing.',
      'Provides a step-by-step visual proof that builds genuine mathematical intuition for scoring marks in exams.',
      'Color-coded sides and live labels help you instantly identify the hypotenuse in any orientation of the triangle.',
    ],
    useCases: [
      'Class 9 CBSE student preparing for annual exam — uses the 3D model to visually verify the proof and understand why a² + b² = c².',
      'Teacher in a government school — projects the interactive model on a smartboard to demonstrate the theorem to 40+ students.',
      'IIT-JEE aspirant — explores edge cases by setting extreme slider values, building deeper intuition for coordinate geometry problems.',
      'Hindi-medium student — learns visually without language barriers, since the 3D animation speaks for itself.',
    ],
    semanticKeywords: ['pythagorean theorem class 9', 'pythagoras theorem proof', 'a2 + b2 = c2', 'CBSE class 9 triangles', 'NCERT chapter 7', 'right triangle hypotenuse', 'pythagorean triplets', 'interactive math visualization', '3D geometry model', 'visual math learning India', 'ganith society', 'पाइथागोरस प्रमेय'],
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
    description: 'Visualize sine, cosine, and tangent as geometric lengths on the unit circle — rotate the angle in real time and watch trigonometric values update live.',
    explanation:
      'The unit circle is a circle with radius 1 centered at the origin. For any angle θ, the point on the circle has coordinates (cos θ, sin θ). This definition is covered in CBSE Class 10. To score well in exams, you need to learn the standard values of sin, cos, and tan for specific angles (0°, 30°, 45°, 60°, 90°) and understand how to apply the Pythagorean identity sin²θ + cos²θ = 1.',
    applications: [
      'Architecture & Engineering: Calculating heights of buildings, bridges, and mountains using angle of elevation and depression.',
      'Music & Sound Engineering: Sound waves are modeled as sine and cosine functions — every note you hear is trigonometry.',
      'Astronomy & Space: Measuring distance to stars and planets using trigonometric parallax.',
      'Navigation & Satellite: GPS systems and ship navigation rely on trigonometric calculations for positioning.',
      'Physics (Class 11+): Projectile motion, simple harmonic motion, and wave equations all use sin and cos.',
    ],
    controls: [
      { id: 'angle', label: 'Angle θ', min: 0, max: 360, step: 1, defaultValue: 45, unit: 'degrees' },
    ],
    challenges: [
      { question: 'At what angle does the sine value become equal to the cosine value?', hint: 'Try θ = 45°. Since sin 45° = cos 45° = 1/√2.' },
      { question: 'Find an angle where the tangent value is undefined or extremely large.', hint: 'Try angles close to 90° or 270° — cos θ approaches 0, making tan θ = sin/cos blow up.' },
      { question: 'At which angles is sin θ = 0?', hint: '0°, 180°, and 360° — the point sits on the x-axis.' },
      { question: 'What is the maximum value sine can reach? At what angle?', hint: 'sin θ reaches 1 at θ = 90°.' },
    ],
    tips: 'SOH CAH TOA! Sine = Opposite/Hypotenuse, Cosine = Adjacent/Hypotenuse, Tangent = Opposite/Adjacent. For board exams, memorize: sin 0° = 0, sin 30° = ½, sin 45° = 1/√2, sin 60° = √3/2, sin 90° = 1.',
    meta: {
      title: 'Unit Circle & Trigonometry — Interactive 3D Visual | Class 10 CBSE Math | Ganith Society',
      description: 'Learn trigonometry visually with a live unit circle. Rotate angles, see sin, cos, tan update in real time. CBSE Class 10 NCERT aligned. Free on Ganith Society.',
    },
    faq: [
      { q: 'What is the unit circle in trigonometry?', a: 'A circle with radius 1 centered at the origin. Any point on it at angle θ has coordinates (cos θ, sin θ), which defines the trig functions geometrically.' },
      { q: 'Why is sin²θ + cos²θ always equal to 1?', a: 'Because the point (cos θ, sin θ) lies on a circle of radius 1, so x² + y² = 1 by definition.' },
      { q: 'Is this topic important for CBSE board exams?', a: 'Yes — Chapter 8 (Introduction to Trigonometry) is a high-weightage chapter in Class 10 CBSE and appears every year.' },
      { q: 'How does this help compared to a textbook?', a: 'You can rotate the angle with a slider and see sin, cos, tan values change live — making abstract ratios feel concrete and intuitive.' },
    ],
    benefits: [
      'Helps you see sin, cos, and tan as actual geometric lengths that change as you rotate the angle, making abstract ratios concrete.',
      'Visualizes why tan 90° is undefined by showing the tangent line growing infinitely as the angle approaches 90°.',
      'Helps you understand quadrant signs by moving the angle through all 4 quadrants and seeing coordinate changes.',
    ],
    useCases: [
      'Class 10 CBSE student preparing for board exam — memorizes standard angle values by watching them on the unit circle.',
      'Class 11 student starting advanced trigonometry — builds intuition for identities and graphs by seeing the unit circle foundation.',
      'Physics student — connects sin/cos to wave motion and SHM by seeing the circular-to-linear relationship.',
      'Teacher conducting an online class — shares the interactive model to explain angle measurement visually.',
    ],
    semanticKeywords: ['unit circle trigonometry', 'sin cos tan visualization', 'trigonometry class 10 CBSE', 'NCERT chapter 8 trigonometry', 'sin²θ + cos²θ = 1 proof', 'interactive trigonometry tool', 'SOH CAH TOA', 'trigonometric ratios visual', 'ganith society', 'त्रिकोणमिति'],
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
    description: 'Explore how changing coefficients a, b, and c reshapes the parabola, moves its roots, and shifts the vertex — live on a 3D graph.',
    explanation:
      'A quadratic equation ax² + bx + c = 0 always graphs as a parabola. This topic is covered in CBSE Class 10. To score well in exams, you need to learn how to use the quadratic formula, understand the nature of roots using the discriminant (b² − 4ac), and practice completing the square. On Ganith Society, you can drag sliders to change a, b, and c and watch the parabola reshape live.',
    applications: [
      'Physics & Sports: The path of a thrown ball, kicked football, or launched rocket follows a parabola — described by a quadratic equation.',
      'Business & Economics: Finding maximum profit or minimum cost — the vertex gives the optimal point.',
      'Engineering & Optics: Satellite dishes, headlight reflectors, and telescope mirrors use parabolic curves to focus signals.',
      'Architecture: Parabolic arches distribute weight efficiently and are used in bridges and doorways.',
      'Computer Graphics: Quadratic Bézier curves are used to draw smooth shapes in design software.',
    ],
    controls: [
      { id: 'a', label: 'Coefficient a', min: -3, max: 3, step: 0.1, defaultValue: 1 },
      { id: 'b', label: 'Coefficient b', min: -6, max: 6, step: 0.1, defaultValue: 0 },
      { id: 'c', label: 'Coefficient c', min: -8, max: 8, step: 0.1, defaultValue: -4 },
    ],
    challenges: [
      { question: 'Adjust the coefficients so that the parabola just touches the x-axis at exactly one point.', hint: 'The discriminant (b² − 4ac) must be exactly 0.' },
      { question: "Make coefficient 'a' negative. What happens to the shape of the parabola?", hint: 'It opens downwards — the vertex becomes a maximum!' },
      { question: 'Can you make the discriminant negative so there are no real roots?', hint: 'Try a = 1, b = 0, c = 4. The parabola floats above the x-axis.' },
      { question: 'Set a = 1, b = −6, c = 9. What do you notice about the roots?', hint: 'There is exactly one root at x = 3 (a perfect square!).' },
    ],
    tips: 'The discriminant Δ = b² − 4ac is the key: Δ > 0 → 2 roots, Δ = 0 → 1 root, Δ < 0 → no real roots. In CBSE board exams, always check the discriminant first before solving!',
    meta: {
      title: 'Quadratic Equations — Interactive Parabola Graph | Class 10 CBSE Math | Ganith Society',
      description: 'Visualize quadratic equations with a live parabola. Change a, b, c and watch roots, vertex, and discriminant update. CBSE Class 10 NCERT aligned. Free on Ganith Society.',
    },
    faq: [
      { q: 'What is a quadratic equation?', a: 'An equation of the form ax² + bx + c = 0, where a ≠ 0. It graphs as a parabola and can have 0, 1, or 2 real roots.' },
      { q: 'Which CBSE class covers quadratic equations?', a: 'Class 10, Chapter 4 — Quadratic Equations. It is one of the most important chapters for board exams.' },
      { q: 'What does the discriminant tell us?', a: 'The discriminant Δ = b² − 4ac determines the nature of roots: Δ > 0 → two distinct real roots, Δ = 0 → one repeated root, Δ < 0 → no real roots.' },
      { q: 'How does Ganith Society help me learn this?', a: 'You can drag sliders to change a, b, and c and watch the parabola reshape live — roots move, vertex shifts, and discriminant updates in real time.' },
    ],
    benefits: [
      'Helps you connect the equation to its graph by seeing how each coefficient affects shape and position.',
      'Visualizes what "no real roots" means by showing the parabola floating above or below the x-axis.',
      'Provides a step-by-step proof of the quadratic formula via completing the square.',
    ],
    useCases: [
      'Class 10 CBSE student preparing for boards — experiments with different discriminant values to understand nature of roots.',
      'Teacher explaining completing the square — projects the step-by-step proof while students follow along.',
      'Olympiad aspirant — explores how vertex form and factored form relate by adjusting coefficients.',
      'Self-learner — uses the 3D visualization to build intuition for graphing without a graphing calculator.',
    ],
    semanticKeywords: ['quadratic equation class 10', 'parabola graph interactive', 'discriminant b2-4ac', 'CBSE class 10 chapter 4', 'quadratic formula visualization', 'roots of quadratic equation', 'completing the square proof', 'vertex of parabola', 'ganith society', 'द्विघात समीकरण'],
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
    description: 'Resize a 3D sphere in real time and instantly calculate volume (V = 4/3 πr³) and surface area — see how radius affects size.',
    explanation:
      'A sphere is a perfectly round 3D shape where every point on the surface is at an equal distance from the center. The volume formula V = (4/3)πr³ is covered in CBSE Class 9. To score well in exams, you need to learn this formula, know how to calculate the surface area (4πr²), and understand how a change in radius affects the volume. On Ganith Society, you can drag the radius slider and watch the sphere grow in 3D while the volume updates live.',
    applications: [
      'Geography & Astronomy: Modeling the Earth, Moon, planets, and stars — all approximately spherical.',
      'Sports & Manufacturing: Soccer balls, basketballs, cricket balls, and bearings are all designed using sphere geometry.',
      'Meteorology & Science: Weather balloons, water droplets, and gas bubbles naturally form spheres due to surface tension.',
      'Medicine: Calculating dosages for spherical pills and capsules, modeling cell structures.',
      'Architecture: Geodesic domes (like Spaceship Earth at Epcot) use sphere geometry for structural efficiency.',
    ],
    controls: [
      { id: 'r', label: 'Radius r', min: 0.5, max: 4, step: 0.1, defaultValue: 2, unit: 'units' },
    ],
    challenges: [
      { question: 'Double the radius from 1 to 2. By how much does the volume increase?', hint: 'It increases by 8 times (2³) — volume scales with the cube of radius!' },
      { question: 'Find the radius that gives a volume closest to 100.', hint: 'Try r ≈ 2.88. Since V = (4/3)π(2.88)³ ≈ 100.' },
      { question: 'What radius gives a surface area of exactly 100?', hint: 'SA = 4πr², so r = √(100/4π) ≈ 2.82.' },
    ],
    tips: 'Remember: Volume scales with r³ (cube) while surface area scales with r² (square). So doubling the radius makes the volume 8× but surface area only 4×. This is a common CBSE board exam question!',
    meta: {
      title: 'Volume of Sphere — Interactive 3D Calculator | Class 9 CBSE Math | Ganith Society',
      description: 'Calculate sphere volume with a live 3D model. Change the radius and watch it grow. NCERT Class 9 Chapter 11 aligned. Free on Ganith Society.',
    },
    faq: [
      { q: 'What is the formula for volume of a sphere?', a: 'V = (4/3)πr³, where r is the radius. This is derived by integrating circular cross-sections from -r to r.' },
      { q: 'Which CBSE class covers volume of sphere?', a: 'Class 9, Chapter 11 — Surface Areas and Volumes. It also appears in Class 10 for combined solid problems.' },
      { q: 'Why does volume increase so fast when radius increases?', a: 'Because volume depends on r³ (cubic). Doubling the radius multiplies volume by 2³ = 8.' },
      { q: 'What is the surface area formula?', a: 'SA = 4πr². Archimedes proved this equals exactly 4 times the area of the great circle.' },
    ],
    benefits: [
      'Helps you see how changing the radius affects the size and volume of the sphere in real time.',
      'Updates volume and surface area side-by-side so you can compare and understand the difference between r² and r³.',
      'Provides a clear visual representation of 3D space, which is hard to understand from flat textbook diagrams.',
    ],
    useCases: [
      'Class 9 CBSE student solving NCERT exercises — verifies answers by entering radius values and comparing computed volume.',
      'Teacher demonstrating why V = (4/3)πr³ — projects the 3D model and walks through the proof step by step.',
      'Student preparing for Olympiad — explores the relationship between sphere, cylinder, and cone volumes (ratio 2:3:1).',
    ],
    semanticKeywords: ['volume of sphere class 9', 'sphere volume formula', 'V = 4/3 πr³', 'CBSE class 9 surface area volume', 'NCERT chapter 11', '3D sphere model', 'surface area of sphere', 'Archimedes sphere proof', 'ganith society', 'गोले का आयतन'],
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
    description: 'Resize the radius and height of a 3D cylinder and instantly compute volume (V = πr²h) and surface area.',
    explanation:
      'A cylinder is a 3D shape with two parallel circular bases connected by a curved surface. Its volume is calculated as V = πr²h. This concept is covered in CBSE Class 9. To score well in exams, you need to learn the formulas for volume, lateral surface area (2πrh), and total surface area (2πr(r+h)). On Ganith Society, you can change the radius and height independently and watch the cylinder reshape in 3D while the volume updates live.',
    applications: [
      'Manufacturing & Packaging: Tin cans, water bottles, pipes, and rollers are all cylindrical — their dimensions are optimized using these formulas.',
      'Construction & Architecture: Pillars, columns, water tanks, and silos are designed using cylinder geometry.',
      'Biology & Nature: Tree trunks, blood vessels, and many plant stems approximate cylinders.',
      'Everyday Math: Calculating how much water a cylindrical tank holds, or how much paint covers a pillar.',
      'Engineering: Hydraulic cylinders, pistons, and engine components rely on precise volume calculations.',
    ],
    controls: [
      { id: 'r', label: 'Radius r', min: 0.5, max: 4, step: 0.1, defaultValue: 2, unit: 'units' },
      { id: 'h', label: 'Height h', min: 0.5, max: 8, step: 0.1, defaultValue: 4, unit: 'units' },
    ],
    challenges: [
      { question: 'Keep the volume the same while making the cylinder taller and thinner.', hint: 'If you increase h, decrease r proportionally. V = πr²h stays constant.' },
      { question: 'What happens to the volume if you double the radius but halve the height?', hint: 'The volume doubles! (2r)² × (h/2) = 4r² × h/2 = 2r²h.' },
      { question: 'Find values of r and h that give a volume closest to 100.', hint: 'Try r = 2.5, h = 5.1. V = π × 6.25 × 5.1 ≈ 100.' },
    ],
    tips: 'The cylinder volume formula V = πr²h is the foundation — a cone is exactly ⅓ of a cylinder. In CBSE exams, combined solid problems often involve cylinders with cones or hemispheres attached.',
    meta: {
      title: 'Volume of Cylinder — Interactive 3D Model | Class 9 CBSE Math | Ganith Society',
      description: 'Calculate cylinder volume and surface area with a live 3D model. Drag sliders to resize. NCERT Class 9 Chapter 11 aligned. Free on Ganith Society.',
    },
    faq: [
      { q: 'What is the formula for volume of a cylinder?', a: 'V = πr²h — base area (πr²) times height (h). It represents stacking circular discs from bottom to top.' },
      { q: 'Which CBSE class covers cylinder volume?', a: 'Class 9, Chapter 11 — Surface Areas and Volumes. Combined solid problems appear in Class 10 as well.' },
      { q: 'What is lateral surface area vs total surface area?', a: 'Lateral SA (2πrh) is just the curved side. Total SA adds both circular caps: TSA = 2πr(r + h).' },
      { q: 'How is cylinder related to cone and sphere?', a: 'For same radius and height: Cone = ⅓ Cylinder, Sphere = ⅔ Cylinder (when h = 2r). This ratio is a classic exam question!' },
    ],
    benefits: [
      'Helps you see that changing the radius has a much bigger effect on volume than changing the height.',
      'Displays both lateral and total surface area live so you can understand the difference between the formulas.',
      'Makes abstract formulas visual by showing how dimensions change the shape in 3D.',
    ],
    useCases: [
      'Class 9 CBSE student solving Chapter 11 exercises — enters dimensions and verifies computed volume against textbook answers.',
      'Teacher explaining why V = πr²h — shows the "stacking discs" concept visually with the 3D model.',
      'Student preparing for competitive exams — explores the cylinder-cone-sphere volume ratio (3:1:2).',
    ],
    semanticKeywords: ['volume of cylinder class 9', 'cylinder volume formula', 'V = πr²h', 'CBSE class 9 surface area volume', 'NCERT chapter 11', '3D cylinder model', 'lateral surface area cylinder', 'total surface area cylinder', 'ganith society', 'बेलन का आयतन'],
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
    description: 'Control slope (m) and y-intercept (b) with sliders and watch a line change direction and position in real time.',
    explanation:
      'A linear equation y = mx + b describes a straight line on the coordinate plane. This topic is covered in CBSE Class 9. To score well in exams, you need to learn how to find the slope and y-intercept, plot points on the line, and solve problems involving constant rates. On Ganith Society, you can drag sliders to control m and b independently and see the line respond instantly.',
    applications: [
      'Finance & Budgeting: Cell phone plans, taxi fare, and subscription costs follow y = mx + b where m is the per-unit rate.',
      'Speed & Distance: Distance = Speed × Time is a linear equation — the slope is the speed.',
      'Temperature Conversion: °F = (9/5)°C + 32 is a classic linear equation with slope 9/5 and y-intercept 32.',
      'Economics: Supply-demand curves at a basic level, cost analysis, and break-even calculations.',
      'Science: Hooke\'s Law (F = kx), Ohm\'s Law (V = IR) — both are linear relationships.',
    ],
    controls: [
      { id: 'm', label: 'Slope m', min: -4, max: 4, step: 0.1, defaultValue: 1 },
      { id: 'b', label: 'Y-intercept b', min: -6, max: 6, step: 0.5, defaultValue: 0 },
    ],
    challenges: [
      { question: 'Make the line parallel to the x-axis. What is the slope?', hint: 'The slope must be 0 — the line is horizontal.' },
      { question: 'Make the line pass through the origin. What must the y-intercept be?', hint: 'The y-intercept (b) must be 0.' },
      { question: 'Set m = 1 and b = 0. This is the identity line y = x. What angle does it make with the x-axis?', hint: '45 degrees — because tan(45°) = 1.' },
      { question: 'Make two lines that are perpendicular. What is the relationship between their slopes?', hint: 'Their slopes multiply to −1. Try m = 2 and m = −0.5.' },
    ],
    tips: 'Parallel lines have equal slopes (m₁ = m₂). Perpendicular lines have slopes that multiply to −1 (m₁ × m₂ = −1). These facts appear frequently in CBSE coordinate geometry questions!',
    meta: {
      title: 'Linear Equations — Interactive Graph | Class 9 CBSE Math | Ganith Society',
      description: 'Visualize y = mx + b with a live graph. Drag slope and intercept sliders to see the line move. CBSE Class 9 NCERT aligned. Free on Ganith Society.',
    },
    faq: [
      { q: 'What is a linear equation?', a: 'An equation of the form y = mx + b that graphs as a straight line. m is the slope and b is the y-intercept.' },
      { q: 'Which CBSE class covers linear equations?', a: 'Class 9, Chapter 4 — Linear Equations in Two Variables. It is also extended in Class 10 with pairs of linear equations.' },
      { q: 'What does slope mean in real life?', a: 'Slope represents the rate of change — speed (distance/time), price per item, or temperature change per degree.' },
    ],
    benefits: [
      'Helps you see how slope affects the line by rotating it as you drag the slider.',
      'Displays both x and y intercepts live with visual markers, clearing confusion.',
      'Provides an interactive rise/run visualization to build geometric intuition for rate of change.',
    ],
    useCases: [
      'Class 9 CBSE student learning slope-intercept form — experiments with different m and b values to see how lines behave.',
      'Teacher introducing coordinate geometry — projects the graph to show how parallel and perpendicular lines relate.',
      'Self-learner preparing for competitive exams — builds intuition for graphing linear inequalities.',
    ],
    semanticKeywords: ['linear equation class 9', 'y = mx + b graph', 'slope intercept form', 'CBSE class 9 chapter 4', 'linear equations in two variables', 'slope of a line', 'interactive graph', 'ganith society', 'रैखिक समीकरण'],
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
    description: 'Drag sliders to resize the base and height of a triangle — watch the area (A = ½ × b × h) update live in 3D. CBSE Class 9 NCERT aligned.',
    explanation:
      'The area of any triangle is calculated as A = ½ × b × h, where b is the base and h is the perpendicular height. This concept is covered in CBSE Class 9. To score well in exams, you need to learn this formula, remember that the height must always be perpendicular to the base, and know when to use Heron\'s formula if height is not given. On Ganith Society, you can drag sliders to change base and height and see the triangle reshape in 3D with area updating live. त्रिभुज का क्षेत्रफल — CBSE कक्षा 9 के लिए इंटरैक्टिव 3D मॉडल।',
    applications: [
      'Construction & Engineering: Triangular trusses in roofs and bridges are inherently rigid — understanding their area helps in structural design.',
      'Surveying & Land Measurement: Irregular land plots are divided into triangles, and their areas are summed to find total area.',
      'Art & Design: Triangular composition guides perspective and visual balance in paintings and photography.',
      'Navigation: Triangulation uses triangle geometry to pinpoint locations on a map.',
      'Computer Graphics: Every 3D model is built from triangular meshes — calculating triangle area is fundamental.',
    ],
    controls: [
      { id: 'base', label: 'Base b', min: 1, max: 10, step: 0.5, defaultValue: 6, unit: 'units' },
      { id: 'height', label: 'Height h', min: 1, max: 8, step: 0.5, defaultValue: 4, unit: 'units' },
    ],
    challenges: [
      { question: 'Make the area exactly 12 by changing base and height.', hint: 'Try b = 6, h = 4 or b = 8, h = 3. Since ½ × b × h = 12.' },
      { question: 'What happens to the area if you double both the base and the height?', hint: 'The area increases by 4 times! ½ × 2b × 2h = 4 × (½bh).' },
      { question: 'Keep the area at 10 while changing the shape. How many combinations can you find?', hint: 'Any b and h where b × h = 20 works: (4,5), (5,4), (10,2), etc.' },
    ],
    tips: 'The area formula A = ½ × b × h is a special case of the parallelogram area (b × h) divided by 2. For CBSE exams, also learn Heron\'s formula for when the height is not given!',
    meta: {
      title: 'Area of Triangle — Interactive 3D Model | Class 9 CBSE Math | Ganith Society',
      description: 'Calculate triangle area with a live 3D model. Drag base and height sliders. CBSE Class 9 NCERT aligned. Free on Ganith Society.',
    },
    faq: [
      { q: 'What is the formula for area of a triangle?', a: 'A = ½ × base × height. The height must be perpendicular to the base.' },
      { q: 'Which CBSE class covers area of triangle?', a: 'Class 9, Chapter 9 — Areas of Parallelograms and Triangles. Heron\'s formula also appears in Chapter 10.' },
      { q: 'What if I only know the three sides?', a: 'Use Heron\'s formula: A = √[s(s−a)(s−b)(s−c)], where s = (a+b+c)/2. Explore it on our Heron\'s Formula topic!' },
    ],
    benefits: [
      'Helps you see that the height must always be perpendicular to the base, clearing confusion for oblique triangles.',
      'Visualizes why the area is half of a parallelogram by showing the proof step-by-step.',
      'Updates the area live as you change dimensions, making the formula concrete.',
    ],
    useCases: [
      'Class 9 CBSE student solving NCERT exercises — verifies area calculations by entering base and height values.',
      'Teacher demonstrating why A = ½bh — shows the parallelogram-to-triangle proof visually.',
    ],
    semanticKeywords: ['area of triangle class 9', 'triangle area formula', 'A = ½ × b × h', 'CBSE class 9 chapter 9', 'NCERT triangles', 'interactive triangle model', 'ganith society', 'त्रिभुज का क्षेत्रफल'],
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
    description: "Move a point along y = x² and watch the tangent line reveal the instantaneous slope — see derivatives come alive in 3D.",
    explanation:
      "The derivative f'(x) measures the instantaneous rate of change of f at x — it's the slope of the tangent line at that exact point. This topic is covered in CBSE Class 11 and 12. To score well in exams, you need to learn the limit definition of derivatives, standard differentiation formulas, and how to apply them to find slopes and rates of change. On Ganith Society, you can move a point along y = x² and watch the tangent line reveal the slope live.",
    applications: [
      'Physics: Velocity is the derivative of position, acceleration is the derivative of velocity — the foundation of mechanics.',
      'Economics: Marginal cost, marginal revenue, and profit optimization all use derivatives.',
      'Biology & Medicine: Rate of population growth, spread of diseases, and drug absorption rates.',
      'Engineering: Optimizing designs — minimum material usage, maximum strength, efficient shapes.',
      'Machine Learning & AI: Gradient descent (used to train neural networks) is entirely based on derivatives.',
    ],
    meta: {
      title: 'Derivatives — Interactive Tangent Line Visualizer | Class 11-12 CBSE Math | Ganith Society',
      description: "Visualize derivatives with a live tangent line on y = x². Drag the point and see f'(x) = 2x update in real time. CBSE Class 11-12. Free on Ganith Society.",
    },
    faq: [
      { q: 'What is a derivative?', a: "The derivative f'(x) is the instantaneous rate of change — the slope of the tangent line to the curve at point x." },
      { q: 'Which CBSE class covers derivatives?', a: 'Class 11 (Chapter 13 — Limits and Derivatives) introduces the concept. Class 12 (Chapter 5) covers it in depth.' },
      { q: 'Why is the derivative of x² equal to 2x?', a: "Using the limit definition: lim(h→0) [(x+h)²−x²]/h = lim(h→0) [2xh+h²]/h = 2x. The proof is shown step by step on Ganith Society." },
    ],
    benefits: [
      'Helps you see slope as a physical, visual quantity by watching the tangent line rotate.',
      'Animates the limit definition process to help you understand how a secant becomes a tangent.',
      'Builds intuition for maxima and minima by showing how the slope changes sign at the vertex.',
    ],
    useCases: [
      'Class 11 CBSE student learning limits — visualizes how the secant line approaches the tangent as h→0.',
      'Class 12 student preparing for boards — uses the interactive model to understand differentiation of polynomial functions.',
      'IIT-JEE aspirant — builds geometric intuition for optimization and curve-sketching problems.',
    ],
    semanticKeywords: ['derivatives class 11', 'derivative visualization', "f'(x) = 2x", 'tangent line slope', 'CBSE class 11 chapter 13', 'limits and derivatives', 'instantaneous rate of change', 'calculus visualization', 'ganith society', 'अवकलज'],
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
    description: 'Watch the Fibonacci spiral grow as you add terms — see how nature\'s favorite sequence creates the Golden Ratio.',
    explanation: 'The Fibonacci sequence (1, 1, 2, 3, 5, 8, 13, 21, ...) is built by a simple rule: each number is the sum of the two before it (Fₙ = Fₙ₋₁ + Fₙ₋₂). This pattern appears in nature and is related to the Golden Ratio. This topic is a great supplement for learning sequences. To understand it well, you should learn how to generate terms using the rule and observe how the ratio of consecutive terms approaches the Golden Ratio. On Ganith Society, you can watch the spiral grow as you add terms.',
    applications: [
      'Nature & Biology: The number of petals on most flowers, the spiral of sunflower seeds, and pinecone scales follow Fibonacci numbers.',
      'Art & Architecture: The Golden Ratio (derived from Fibonacci) governs proportions in the Parthenon, Mona Lisa, and modern logos.',
      'Computer Science: Fibonacci heaps, search algorithms, and dynamic programming patterns.',
      'Finance: Fibonacci retracement levels are used in stock market technical analysis.',
      'Music: Musical compositions by Bartók and Debussy use Fibonacci proportions for timing.',
    ],
    meta: {
      title: 'Fibonacci Sequence — Interactive Spiral Visualization | Math | Ganith Society',
      description: 'Explore the Fibonacci sequence and Golden Ratio with a live spiral. Add terms and watch the ratio approach 1.618. Free on Ganith Society.',
    },
    faq: [
      { q: 'What is the Fibonacci sequence?', a: 'A series where each number is the sum of the two before it: 1, 1, 2, 3, 5, 8, 13, 21, ... It was introduced by Leonardo of Pisa (Fibonacci).' },
      { q: 'What is the Golden Ratio?', a: 'φ ≈ 1.618 — the ratio that consecutive Fibonacci numbers approach. It appears in nature, art, and architecture.' },
      { q: 'Is Fibonacci in the CBSE syllabus?', a: 'Number patterns are in Class 9, and sequences/series are in Class 11 (Chapter 9). Fibonacci is a great supplementary topic for both.' },
    ],
    benefits: [
      'Helps you see the pattern emerge visually as the spiral grows square by square.',
      'Shows how the ratio of consecutive terms approaches the Golden Ratio (1.618) as you add terms.',
    ],
    useCases: [
      'Student exploring math in nature — connects the spiral to real-world patterns in flowers and shells.',
      'Class 11 student studying sequences — sees Fibonacci as a concrete example of a recurrence relation.',
    ],
    semanticKeywords: ['fibonacci sequence', 'golden ratio', 'fibonacci spiral', 'nature math patterns', 'sequences and series', 'φ = 1.618', 'ganith society', 'फिबोनाची अनुक्रम'],
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
    description: 'Watch area under a curve fill up with rectangles — increase the count and see the Riemann sum converge to the exact integral.',
    explanation: 'Integration is the process of finding the total accumulation of a quantity — area under a curve, distance traveled, or volume. This topic is covered in CBSE Class 12. To score well in exams, you need to learn the methods of integration (substitution, partial fractions, by parts) and understand the concept of definite integrals as area. On Ganith Society, you can drag the slider to increase rectangles from 2 to 50 and watch the Riemann sum approximation converge to the exact area.',
    applications: [
      'Physics: Calculating work done, center of mass, electric field, and displacement from velocity-time graphs.',
      'Engineering: Finding areas, volumes, and surface areas of irregular shapes in structural design.',
      'Probability & Statistics: Continuous probability distributions (normal curve area) are calculated via integration.',
      'Economics: Consumer surplus, producer surplus, and total revenue over a period.',
      'Computer Graphics: Rendering smooth curves and computing lighting/shading in 3D scenes.',
    ],
    meta: {
      title: 'Integration — Riemann Sum Visualizer | Class 12 CBSE Math | Ganith Society',
      description: 'Visualize integration as area under a curve. Increase rectangles and watch Riemann sums converge. CBSE Class 12 NCERT aligned. Free on Ganith Society.',
    },
    faq: [
      { q: 'What is integration?', a: 'The process of finding total accumulation — like area under a curve. It is the reverse of differentiation.' },
      { q: 'Which CBSE class covers integration?', a: 'Class 12, Chapter 7 — Integrals. It is one of the highest-weightage topics in board exams.' },
      { q: 'What is a Riemann sum?', a: 'An approximation of the integral by summing the areas of rectangles fitted under the curve. More rectangles = better approximation.' },
    ],
    benefits: [
      'Helps you visualize integration as the area under a curve using rectangles.',
      'Shows how the Riemann sum approximation gets closer to the exact area as you increase rectangles.',
      'Makes the transition from discrete sums to continuous integrals intuitive.',
    ],
    semanticKeywords: ['integration class 12', 'riemann sum visualization', 'area under curve', 'CBSE class 12 chapter 7', 'definite integral', 'fundamental theorem of calculus', 'ganith society', 'समाकलन'],
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
    description: 'Plot points on the Cartesian plane, identify quadrants, and calculate distance from origin — all interactively. CBSE Class 9 NCERT aligned.',
    explanation:
      'Coordinate geometry helps us locate points on a plane using two perpendicular axes (x and y) that intersect at the origin (0,0). This topic is covered in CBSE Class 9. To score well in exams, you need to learn how to plot points, identify the signs of coordinates in different quadrants, and understand terms like abscissa and ordinate. On Ganith Society, you can drag sliders to move a point and see its quadrant and distance update live. निर्देशांक ज्यामिति — कार्तीय तल पर बिंदु प्लॉट करें, CBSE कक्षा 9।',
    applications: [
      'GPS & Navigation: Google Maps, Uber, and every navigation app uses coordinate systems to pinpoint locations.',
      'Computer Graphics & Gaming: Every pixel on your screen has an (x, y) coordinate — the foundation of all digital display.',
      'Aviation & Maritime: Pilots and sailors use coordinate grids to navigate safely across oceans and skies.',
      'Data Visualization: Graphs, charts, and plots in science and business all use the Cartesian coordinate system.',
      'Robotics & Automation: Robot arms and CNC machines move to precise (x, y, z) coordinates.',
    ],
    meta: {
      title: 'Coordinate Geometry — Interactive Cartesian Plane | Class 9 CBSE Math | Ganith Society',
      description: 'Plot points, identify quadrants, and calculate distance on a live Cartesian plane. CBSE Class 9 NCERT Chapter 3 aligned. Free on Ganith Society.',
    },
    faq: [
      { q: 'What is coordinate geometry?', a: 'The study of geometry using the Cartesian coordinate system — representing points as (x, y) pairs on two perpendicular axes.' },
      { q: 'Which CBSE class covers coordinate geometry?', a: 'Class 9 (Chapter 3) introduces the Cartesian plane. Class 10 extends it with distance, section, and area formulas.' },
      { q: 'How to remember quadrant signs?', a: 'Quadrant I: (+,+), II: (−,+), III: (−,−), IV: (+,−). Think counterclockwise from the top-right.' },
    ],
    benefits: [
      'Helps you understand the 4 quadrants and their sign conventions visually by moving a point.',
      'Makes it easy to understand abscissa (x) and ordinate (y) by showing distance lines from axes.',
      'Calculates the distance from the origin live, helping you build intuition for the distance formula.',
    ],
    semanticKeywords: ['coordinate geometry class 9', 'cartesian plane', 'quadrants', 'CBSE class 9 chapter 3', 'abscissa ordinate', 'plotting points', 'ganith society', 'निर्देशांक ज्यामिति'],
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
    description: 'See how a cone is exactly ⅓ of a cylinder — resize radius and height to calculate volume and surface area live.',
    explanation:
      'A cone is a 3D shape with a circular base tapering to a point. Its volume is calculated as V = ⅓πr²h. This concept is covered in CBSE Class 9. To score well in exams, you need to learn the formula for volume, curved surface area (πrl), and how to find the slant height using l = √(r² + h²). On Ganith Society, you can drag sliders to resize the cone and watch volume and surface area update in real time.',
    applications: [
      'Ice Cream & Food Industry: Ice cream cones, party hats, and funnels are all conical — their capacity is calculated using this formula.',
      'Aerospace & Rockets: Rocket nose cones are designed using cone geometry to minimize air resistance.',
      'Construction & Storage: Conical roofs, silos, and sand/grain heaps use cone volume for capacity planning.',
      'Traffic & Safety: Traffic cones are a daily sight — understanding their geometry is practical math.',
      'Water Flow & Funnels: Funnels use the cone shape to direct liquid flow efficiently.',
    ],
    controls: [
      { id: 'r', label: 'Radius r', min: 0.5, max: 4, step: 0.1, defaultValue: 2, unit: 'units' },
      { id: 'h', label: 'Height h', min: 0.5, max: 8, step: 0.1, defaultValue: 4, unit: 'units' },
    ],
    challenges: [
      { question: 'Can you adjust the radius and height to make the volume exactly 50?', hint: 'Try r ≈ 3.1, h ≈ 5. V = ⅓π(3.1)²(5) ≈ 50.' },
      { question: 'What happens to the volume if you double the radius but keep the height the same?', hint: 'The volume increases by 4× because radius is squared!' },
      { question: 'Compare cone volume to cylinder volume with same r and h. What is the ratio?', hint: 'Cone = ⅓ Cylinder. The ratio is 1:3.' },
    ],
    tips: 'A cone is exactly ⅓ of a cylinder with the same base and height. For CBSE combined solid problems, remember: Cylinder = 3 Cones, Sphere = 2 Cones (when h = 2r). The slant height l = √(r² + h²) uses the Pythagorean theorem!',
    meta: {
      title: 'Volume of Cone — Interactive 3D Model | Class 9 CBSE Math | Ganith Society',
      description: 'Calculate cone volume and surface area with a live 3D model. See the cone-cylinder relationship. CBSE Class 9 NCERT aligned. Free on Ganith Society.',
    },
    faq: [
      { q: 'What is the formula for volume of a cone?', a: 'V = ⅓πr²h — exactly one-third of the cylinder volume with the same dimensions.' },
      { q: 'How is slant height calculated?', a: 'l = √(r² + h²) — using the Pythagorean theorem on the radius, height, and slant height.' },
      { q: 'Which CBSE class covers cone volume?', a: 'Class 9, Chapter 11 — Surface Areas and Volumes. Combined solid problems appear in Class 10.' },
    ],
    benefits: [
      'Helps you visualize the relationship between height, radius, and slant height as a right triangle.',
      'Shows how a cone is exactly one-third of a cylinder with the same dimensions.',
      'Updates curved and total surface area live as you change dimensions.',
    ],
    semanticKeywords: ['volume of cone class 9', 'cone volume formula', 'V = ⅓πr²h', 'CBSE class 9 chapter 11', 'slant height cone', 'cone vs cylinder', 'ganith society', 'शंकु का आयतन'],
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
    description: 'Explore parallelogram properties and the mid-point theorem interactively — adjust base, height, and skew to see area update live.',
    explanation:
      'A quadrilateral with both pairs of opposite sides parallel is a parallelogram. This topic is covered in CBSE Class 9. To score well in exams, you need to learn properties like opposite sides being equal, opposite angles being equal, and diagonals bisecting each other. You also need to learn the Mid-point Theorem. On Ganith Society, you can drag the skew slider to deform the parallelogram and see that its area (b × h) remains unchanged.',
    applications: [
      'Automotive: Windshield wiper mechanisms use parallelogram linkages to keep blades parallel while sweeping.',
      'Architecture & Bridges: Trusses and structural supports use parallelogram shapes for stability and strength.',
      'Tiling & Interior Design: Parallelogram-shaped tiles create stunning geometric floor and wall patterns.',
      'Mechanical Engineering: Pantographs (used for scaling drawings) use parallelogram geometry.',
      'Art & Typography: Italic fonts and oblique designs are essentially parallelogram transformations of rectangles.',
    ],
    meta: {
      title: 'Properties of Parallelograms — Interactive Model | Class 9 CBSE Math | Ganith Society',
      description: 'Explore parallelogram properties with a live model. Adjust skew and see area stay constant. CBSE Class 9 Chapter 8 aligned. Free on Ganith Society.',
    },
    faq: [
      { q: 'What is a parallelogram?', a: 'A quadrilateral where both pairs of opposite sides are parallel. Opposite sides and angles are equal, and diagonals bisect each other.' },
      { q: 'Which CBSE class covers parallelograms?', a: 'Class 9, Chapter 8 — Quadrilaterals. It covers properties, proofs, and the mid-point theorem.' },
      { q: 'What is the mid-point theorem?', a: 'The line joining mid-points of two sides of a triangle is parallel to the third side and half its length.' },
    ],
    benefits: [
      'Helps you see that the area of a parallelogram depends only on base and height, not on the slant (skew).',
      'Visualizes the properties like equal opposite angles and bisecting diagonals clearly.',
      'Helps you understand the Mid-point Theorem by showing the parallel relationship visually.',
    ],
    semanticKeywords: ['parallelogram properties class 9', 'quadrilaterals CBSE', 'mid-point theorem', 'CBSE class 9 chapter 8', 'area of parallelogram', 'ganith society', 'समांतर चतुर्भुज'],
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
    description: 'Visualize circle theorems live — see why the angle at the center is double the angle at the circumference.',
    explanation:
      'A circle is the set of all points in a plane that are at a given distance from a center. This topic is covered in CBSE Class 9. To score well in exams, you need to learn theorems like the angle subtended by an arc at the center being double the angle at the circumference, and angles in the same segment being equal. On Ganith Society, you can move points along the arc and watch the angles update live to verify these theorems.',
    applications: [
      'Architecture & Engineering: Designing arches, domes, and curved bridges relies on circle geometry and angle theorems.',
      'Navigation: Using a sextant to measure angles between stars and the horizon for celestial navigation.',
      'Art & Design: Creating geometric patterns, mandalas, and symmetric logos.',
      'Astronomy: Calculating orbits and eclipses uses circle properties.',
      'Mechanical Design: Gears, pulleys, and wheels are designed using circle theorems.',
    ],
    meta: {
      title: 'Circle Theorems — Interactive 3D Visualization | Class 9 CBSE Math | Ganith Society',
      description: 'Explore circle theorems with a live model. See why the central angle is double the inscribed angle. CBSE Class 9 Chapter 10 aligned. Free on Ganith Society.',
    },
    faq: [
      { q: 'What is the central angle theorem?', a: 'The angle subtended by an arc at the center of a circle is double the angle subtended by it at any point on the remaining part.' },
      { q: 'Which CBSE class covers circles?', a: 'Class 9, Chapter 10 covers circle theorems. Class 10 extends this with tangents to a circle.' },
      { q: 'What are angles in the same segment?', a: 'Angles subtended by the same arc at any points on the remaining part of the circle are equal.' },
    ],
    benefits: [
      'Helps you understand the central angle theorem by showing the 2:1 ratio live as you change the angle.',
      'Demonstrates that angles in the same segment are equal by letting you move the point along the circle.',
      'Makes abstract geometry theorems interactive and easy to remember.',
    ],
    semanticKeywords: ['circle theorems class 9', 'central angle theorem', 'angles in same segment', 'CBSE class 9 chapter 10', 'circles NCERT', 'ganith society', 'वृत्त के प्रमेय'],
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
    description: 'Visualize the square root spiral and see how irrational numbers like √2 and √3 are plotted on a number line.',
    explanation:
      'Irrational numbers cannot be expressed as a simple fraction p/q. This topic is covered in CBSE Class 9. To score well in exams, you need to learn how to represent irrational numbers on a number line and understand the square root spiral method. On Ganith Society, you can increase the steps to watch the spiral grow and see how these lengths are constructed.',
    applications: [
      'Geometry: Constructing precise geometric lengths that cannot be measured directly with a ruler.',
      'Aesthetics & Design: The square root spiral is a beautiful geometric construction used in art and design.',
      'Computer Science: Understanding number representation and precision in computing.',
      'Physics: Calculating distances in multi-dimensional space.',
    ],
    meta: {
      title: 'Irrational Numbers — Square Root Spiral | Class 9 CBSE Math | Ganith Society',
      description: 'Explore irrational numbers and the square root spiral with a live model. See how √2 and √3 are constructed. CBSE Class 9 NCERT aligned. Free on Ganith Society.',
    },
    faq: [
      { q: 'What is an irrational number?', a: 'A number that cannot be written as a simple fraction. Its decimal representation is non-terminating and non-repeating (e.g., √2, π).' },
      { q: 'What is the square root spiral?', a: 'A spiral made of right triangles, where the hypotenuse of each triangle is the square root of a consecutive integer: √2, √3, √4, etc.' },
      { q: 'Which CBSE class covers this?', a: 'Class 9, Chapter 1 — Number Systems covers irrational numbers and the construction of the square root spiral.' },
    ],
    benefits: [
      'Helps you visualize the construction of irrational lengths like √2 and √3 geometrically.',
      'Shows how the square root spiral grows step-by-step using the Pythagorean theorem.',
      'Makes the concept of irrational numbers concrete by showing them as physical lengths.',
    ],
    semanticKeywords: ['irrational numbers class 9', 'square root spiral', 'Spiral of Theodorus', 'CBSE class 9 chapter 1', 'number systems NCERT', 'plotting root 2 on number line', 'ganith society', 'अपरिमेय संख्याएँ'],
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
    description: 'Understand Mean, Median, and Mode interactively with a live bar graph — change data values and watch the measures shift.',
    explanation:
      'Statistics involves collecting, analyzing, and interpreting data. Measures of central tendency help find a single value that represents the center of a data set. This topic is covered in CBSE Class 9. To score well in exams, you need to learn the formulas for mean, median, and mode for ungrouped data, and understand how to find them from a given data set. On Ganith Society, you can adjust the heights of bars in the graph and see the mean, median, and mode update live.',
    applications: [
      'Economics: Calculating average income, GDP, and inflation rates.',
      'Education: Analyzing student test scores to understand class performance.',
      'Business & Marketing: Finding the most popular product (mode) or average customer spend (mean).',
      'Weather Forecasting: Calculating average rainfall and temperature trends.',
      'Sports: Player statistics like batting average in cricket use the mean.',
    ],
    meta: {
      title: 'Statistics (Mean, Median, Mode) — Interactive Graph | Class 9 CBSE Math | Ganith Society',
      description: 'Learn central tendency with a live bar graph. Change values and see mean, median, mode update in real time. CBSE Class 9 NCERT aligned. Free on Ganith Society.',
    },
    faq: [
      { q: 'What is the mean?', a: 'The average value of a data set, calculated by adding all numbers and dividing by the total count.' },
      { q: 'What is the median?', a: 'The middle value when the data set is arranged in ascending or descending order.' },
      { q: 'What is the mode?', a: 'The value that appears most frequently in a data set.' },
      { q: 'Which CBSE class covers this?', a: 'Class 9, Chapter 14 covers basic statistics including mean, median, and mode for ungrouped data.' },
    ],
    benefits: [
      'Helps you understand the difference between mean, median, and mode visually.',
      'Updates all three measures live as you change data values, making it easy to see how outliers affect them.',
      'Provides a clear bar graph representation of data points.',
    ],
    semanticKeywords: ['statistics class 9', 'mean median mode', 'central tendency', 'CBSE class 9 chapter 14', 'statistics NCERT', 'bar graph interactive', 'ganith society', 'सांख्यिकी'],
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
  },
  {
    id: 'rectangle',
    title: 'Area of Rectangle & Square',
    category: 'Geometry',
    difficulty: 'Beginner',
    icon: '🟩',
    formulaPreview: 'A = w × h',
    description: 'Visualize the area of a rectangle and see how it becomes a square when width equals height — live in 3D.',
    explanation:
      'The area of a rectangle is calculated by multiplying its width by its height (A = w × h). This concept is covered in CBSE Class 9. To score well in exams, you need to learn the formulas for area and perimeter of both rectangles and squares, and understand how to find one dimension if area and the other dimension are given. On Ganith Society, you can drag sliders to change width and height and watch the rectangle reshape in 3D with area updating live.',
    applications: [
      'Flooring & Tiling: Calculating the number of tiles needed for a room based on area.',
      'Farming & Agriculture: Measuring field area for crop planning and seed calculation.',
      'Screen Size & Displays: Understanding aspect ratios of TVs, monitors, and phones.',
      'Architecture: Floor planning and room layout design.',
      'Art & Design: Canvas size and layout proportions.',
    ],
    meta: {
      title: 'Area of Rectangle & Square — Interactive 3D Model | Class 9 CBSE Math | Ganith Society',
      description: 'Calculate rectangle and square area with a live 3D model. Drag width and height sliders. CBSE Class 9 NCERT aligned. Free on Ganith Society.',
    },
    faq: [
      { q: 'What is the formula for area of a rectangle?', a: 'A = width × height. It represents the number of unit squares that fit inside the shape.' },
      { q: 'How does it differ from a square?', a: 'A square is a special rectangle where width equals height, so the area is side².' },
      { q: 'Which CBSE class covers this?', a: 'Basic area concepts are covered in Class 9 in the context of parallelograms and triangles (Chapter 9).' },
    ],
    benefits: [
      'Helps you visualize the area as filling the shape with unit squares, making the formula intuitive.',
      'Shows how a rectangle becomes a square when width equals height, connecting the two concepts.',
      'Updates area and perimeter live as you change dimensions, helping you understand the relationship.',
    ],
    semanticKeywords: ['area of rectangle class 9', 'area of square', 'rectangle area formula', 'CBSE class 9 geometry', 'NCERT math chapter 9', 'interactive rectangle model', 'ganith society', 'आयत का क्षेत्रफल'],
    controls: [
      { id: 'width', label: 'Width', min: 1, max: 10, step: 0.5, defaultValue: 5, unit: 'units' },
      { id: 'height', label: 'Height', min: 1, max: 8, step: 0.5, defaultValue: 3, unit: 'units' },
    ],
    compute: (v) => ({
      'Area A': v.width * v.height,
      'Perimeter': 2 * (v.width + v.height),
      'Is Square': Math.abs(v.width - v.height) < 0.1 ? 'Yes' : 'No',
    }),
    formulas: [
      { label: 'Area of Rectangle', latex: 'A = w \\times h' },
      { label: 'Area of Square', latex: 'A = s^2' },
      { label: 'Perimeter', latex: 'P = 2(w + h)' },
    ],
    proofSteps: [
      { text: 'A rectangle with width w and height h can be tiled with w × h unit squares.', latex: 'A = w \\times h' },
      { text: 'If width equals height (w = h = s), it is a square.', latex: 's = w = h' },
      { text: 'The area formula becomes s × s or s².', latex: 'A = s^2' },
    ],
    Scene: RectangleScene,
  },
  {
    id: 'cuboid',
    title: 'Surface Areas and Volumes of Cubes & Cuboids',
    category: 'Geometry',
    difficulty: 'Beginner',
    icon: '📦',
    formulaPreview: 'V = l × w × h',
    description: 'Explore volume and surface area of cubes and cuboids — drag sliders to resize and see it become a cube when all sides are equal.',
    explanation:
      'A cuboid is a 3D shape with six rectangular faces. Its volume is the product of its length, width, and height (V = l × w × h). This topic is covered in CBSE Class 9. To score well in exams, you need to learn the formulas for volume and total surface area of both cuboids and cubes, and understand how to solve problems involving painting walls or filling tanks. On Ganith Society, you can adjust dimensions and watch the 3D cuboid reshape with volume and surface area updating live.',
    applications: [
      'Packaging & Shipping: Designing boxes and containers to maximize volume while minimizing material.',
      'Architecture & Construction: Calculating room volume for air conditioning and wall area for painting.',
      'Storage & Warehousing: Estimating the capacity of water tanks, pools, and storage units.',
      'Manufacturing: Creating components and products with precise volume requirements.',
      'Everyday Math: Calculating how much soil fits in a raised garden bed or water in a fish tank.',
    ],
    meta: {
      title: 'Volume & Surface Area of Cuboid — Interactive 3D Model | Class 9 CBSE Math | Ganith Society',
      description: 'Calculate cube and cuboid volume and surface area with a live 3D model. Drag sliders to resize. CBSE Class 9 NCERT aligned. Free on Ganith Society.',
    },
    faq: [
      { q: 'What is the formula for volume of a cuboid?', a: 'V = length × width × height. It represents the number of unit cubes that fit inside.' },
      { q: 'What is the surface area of a cuboid?', a: 'SA = 2(lw + wh + hl) — the sum of the areas of all six rectangular faces.' },
      { q: 'Which CBSE class covers this?', a: 'Class 9, Chapter 11 — Surface Areas and Volumes. It also appears in Class 10 for combined solid problems.' },
    ],
    benefits: [
      'Helps you see how changing one dimension affects both volume and surface area in 3D.',
      'Shows how a cuboid becomes a cube when all sides are equal, simplifying the formulas.',
      'Updates volume and surface area live, making the calculations concrete and easy to check.',
    ],
    semanticKeywords: ['volume of cuboid class 9', 'surface area of cuboid', 'V = lwh', 'CBSE class 9 chapter 11', 'NCERT surface area volume', 'cube volume formula', 'ganith society', 'घनाभ का आयतन'],
    controls: [
      { id: 'length', label: 'Length', min: 1, max: 6, step: 0.5, defaultValue: 4, unit: 'units' },
      { id: 'width', label: 'Width', min: 1, max: 6, step: 0.5, defaultValue: 3, unit: 'units' },
      { id: 'height', label: 'Height', min: 1, max: 6, step: 0.5, defaultValue: 2, unit: 'units' },
    ],
    compute: (v) => ({
      'Volume V': v.length * v.width * v.height,
      'Surface Area': 2 * (v.length * v.width + v.width * v.height + v.height * v.length),
      'Is Cube': (Math.abs(v.length - v.width) < 0.1 && Math.abs(v.width - v.height) < 0.1) ? 'Yes' : 'No',
    }),
    formulas: [
      { label: 'Volume of Cuboid', latex: 'V = l \\times w \\times h' },
      { label: 'Surface Area of Cuboid', latex: 'SA = 2(lw + wh + hl)' },
      { label: 'Volume of Cube', latex: 'V = s^3' },
      { label: 'Surface Area of Cube', latex: 'SA = 6s^2' },
    ],
    proofSteps: [
      { text: 'Volume is the product of base area and height.', latex: 'V = (l \\times w) \\times h = lwh' },
      { text: 'Surface area is the sum of all 6 faces (3 pairs of equal faces).', latex: 'SA = 2lw + 2wh + 2hl' },
      { text: 'For a cube, all sides are equal (l = w = h = s).', latex: 'V = s^3, \\quad SA = 6s^2' },
    ],
    Scene: CuboidScene,
  },
  {
    id: 'herons-formula',
    title: "Heron's Formula",
    category: 'Geometry',
    difficulty: 'Intermediate',
    icon: '🔺',
    formulaPreview: 'A = √s(s-a)(s-b)(s-c)',
    description: "Calculate the area of a triangle when all three sides are known using Heron's formula.",
    explanation:
      "Heron's formula allows you to calculate the area of any triangle when you know the lengths of all three sides. This topic is covered in CBSE Class 9. To score well in exams, you need to learn how to find the semi-perimeter s = (a+b+c)/2 first, and then apply the formula Area = √[s(s-a)(s-b)(s-c)]. This is useful when the height is not given. On Ganith Society, you can adjust side lengths and the angle to see the third side calculated and the area computed live.",
    applications: [
      'Surveying & Land Measurement: Finding the area of irregular land plots by dividing them into triangles and measuring sides.',
      'Navigation: Calculating areas on maps where only distances are known.',
      'Architecture & Engineering: Stress analysis in triangular structures where heights are difficult to measure.',
      'Everyday Math: Calculating the area of a triangular garden or cloth piece.',
    ],
    meta: {
      title: "Heron's Formula — Interactive Triangle Area | Class 9 CBSE Math | Ganith Society",
      description: "Calculate triangle area using Heron's formula with a live model. CBSE Class 9 NCERT Chapter 10 aligned. Free on Ganith Society.",
    },
    faq: [
      { q: "What is Heron's formula?", a: "A formula to find the area of a triangle when all three side lengths are known: A = √[s(s-a)(s-b)(s-c)], where s is the semi-perimeter." },
      { q: 'What is the semi-perimeter?', a: 'Half of the perimeter of the triangle: s = (a + b + c) / 2.' },
      { q: 'Which CBSE class covers this?', a: 'Class 9, Chapter 10 — Heron\'s Formula.' },
    ],
    benefits: [
      'Helps you calculate the area of a triangle without knowing its height.',
      'Shows how the third side changes as you change the angle between two sides.',
      'Calculates semi-perimeter and area live, making it easy to practice and verify answers.',
    ],
    semanticKeywords: ["Heron's formula class 9", 'triangle area three sides', 'semi-perimeter', 'CBSE class 9 chapter 10', 'Herons formula NCERT', 'ganith society', 'हीरोन का सूत्र'],
    controls: [
      { id: 'a', label: 'Side a', min: 1, max: 8, step: 0.5, defaultValue: 5, unit: 'units' },
      { id: 'b', label: 'Side b', min: 1, max: 8, step: 0.5, defaultValue: 4, unit: 'units' },
      { id: 'angle', label: 'Angle C', min: 10, max: 170, step: 5, defaultValue: 60, unit: 'degrees' },
    ],
    compute: (v) => {
      const angleRad = (v.angle * Math.PI) / 180
      const c = Math.sqrt(v.a * v.a + v.b * v.b - 2 * v.a * v.b * Math.cos(angleRad))
      const s = (v.a + v.b + c) / 2
      const area = Math.sqrt(s * (s - v.a) * (s - v.b) * (s - c))
      return {
        'Side c': c.toFixed(2),
        'Semi-perimeter s': s.toFixed(2),
        'Area A': area.toFixed(2),
      }
    },
    formulas: [
      { label: "Heron's Formula", latex: 'A = \\sqrt{s(s-a)(s-b)(s-c)}' },
      { label: 'Semi-perimeter', latex: 's = \\dfrac{a+b+c}{2}' },
    ],
    proofSteps: [
      { text: 'Start with the semi-perimeter s.', latex: 's = \\dfrac{a+b+c}{2}' },
      { text: "Apply Heron's formula.", latex: 'A = \\sqrt{s(s-a)(s-b)(s-c)}' },
    ],
    Scene: HeronsFormulaScene,
  },
  {
    id: 'probability',
    title: 'Probability (Experimental)',
    category: 'Statistics',
    difficulty: 'Beginner',
    icon: '🎲',
    formulaPreview: 'P(E) = m / n',
    description: 'Flip a coin or roll a die and see how experimental probability approaches theoretical probability.',
    explanation:
      'Probability measures the likelihood of an event occurring. This topic is covered in CBSE Class 9. To score well in exams, you need to learn the formula for experimental probability P(E) = (Number of trials in which event happened) / (Total number of trials) and solve problems based on data from experiments. On Ganith Society, you can simulate coin flips and die rolls to see the law of large numbers in action.',
    applications: [
      'Weather Forecasting: Predicting the chance of rain or storms based on historical data.',
      'Gaming & Dice Games: Understanding the odds of winning or getting specific outcomes.',
      'Insurance & Risk Management: Calculating premiums based on the probability of accidents or claims.',
      'Business & Finance: Predicting stock market trends and assessing investment risks.',
      'Quality Control: Estimating the number of defective items in a batch.',
    ],
    meta: {
      title: 'Probability (Experimental) — Interactive Simulation | Class 9 CBSE Math | Ganith Society',
      description: 'Learn probability with live coin flips and die rolls. See experimental probability in action. CBSE Class 9 NCERT aligned. Free on Ganith Society.',
    },
    faq: [
      { q: 'What is experimental probability?', a: 'Probability based on the actual results of an experiment or trials.' },
      { q: 'What is the formula for probability?', a: 'P(E) = Number of favorable outcomes / Total number of trials.' },
      { q: 'Which CBSE class covers this?', a: 'Class 9, Chapter 15 covers experimental probability.' },
    ],
    benefits: [
      'Helps you see how experimental probability approaches theoretical probability with more trials.',
      'Provides live simulations of coin flips and die rolls.',
      'Makes the law of large numbers concrete and easy to understand.',
    ],
    semanticKeywords: ['probability class 9', 'experimental probability', 'empirical probability', 'CBSE class 9 chapter 15', 'probability NCERT', 'coin flip simulation', 'ganith society', 'प्रायिकता'],
    controls: [],
    compute: () => ({
      'P(Heads)': '0.50',
      'P(Tails)': '0.50',
      'P(Any Die Face)': '0.17',
    }),
    formulas: [
      { label: 'Experimental Probability', latex: 'P(E) = \\dfrac{\\text{Number of trials in which event happened}}{\\text{Total number of trials}}' },
    ],
    proofSteps: [
      { text: 'Define the event E.', latex: 'E = \\text{event}' },
      { text: 'Count the number of trials where E occurred.', latex: 'm = \\text{favorable trials}' },
      { text: 'Divide by total trials n.', latex: 'P(E) = \\dfrac{m}{n}' },
    ],
    Scene: ProbabilityScene,
  },
  {
    id: 'lines-and-angles',
    title: 'Lines and Angles',
    category: 'Geometry',
    difficulty: 'Beginner',
    icon: '⟪⟫',
    formulaPreview: '∠1 = ∠5',
    description: 'Explore parallel lines, transversals, and angle relationships — see why corresponding and alternate angles are equal.',
    explanation:
      'When a transversal cuts two parallel lines, several pairs of angles are formed. This topic is covered in CBSE Class 9. To score well in exams, you need to learn the properties of corresponding angles, alternate interior angles, and co-interior angles. On Ganith Society, you can adjust the transversal angle and line tilt to see these relationships hold true only when lines are parallel.',
    applications: [
      'Architecture & Construction: Ensuring walls are perpendicular and beams are parallel.',
      'Navigation: Using angles to determine heading and direction.',
      'Optics: Study of light reflection and refraction involving angles.',
      'Design & Art: Creating patterns with symmetric and repeating angles.',
      'Engineering: Designing structures that require precise angle calculations for stability.',
    ],
    meta: {
      title: 'Lines and Angles — Interactive Transversal Model | Class 9 CBSE Math | Ganith Society',
      description: 'Explore parallel lines and transversals with a live model. See corresponding and alternate angles. CBSE Class 9 NCERT Chapter 6 aligned. Free on Ganith Society.',
    },
    faq: [
      { q: 'What is a transversal?', a: 'A line that intersects two or more lines at distinct points.' },
      { q: 'What happens when lines are parallel?', a: 'Corresponding angles are equal, alternate interior angles are equal, and co-interior angles are supplementary.' },
      { q: 'Which CBSE class covers this?', a: 'Class 9, Chapter 6 — Lines and Angles.' },
    ],
    benefits: [
      'Helps you see that corresponding and alternate angles are equal only when lines are parallel.',
      'Demonstrates co-interior angles being supplementary visually.',
      'Interactive sliders let you experiment with different angles and see the properties hold true.',
    ],
    semanticKeywords: ['lines and angles class 9', 'parallel lines transversal', 'corresponding angles', 'alternate interior angles', 'CBSE class 9 chapter 6', 'lines and angles NCERT', 'ganith society', 'रेखाएँ और कोण'],
    controls: [
      { id: 'angle', label: 'Transversal Angle', min: 20, max: 160, step: 5, defaultValue: 60, unit: 'degrees' },
      { id: 'tilt', label: 'Line 2 Tilt', min: -30, max: 30, step: 5, defaultValue: 0, unit: 'degrees' },
    ],
    compute: (v) => {
      const isParallel = Math.abs(v.tilt || 0) < 0.5
      return {
        'Transversal Angle': `${v.angle}°`,
        'Line 2 Tilt': `${v.tilt}°`,
        'Status': isParallel ? 'Parallel' : 'Not Parallel',
        'Corresponding Angles': isParallel ? 'Equal' : 'Not Equal',
      }
    },
    formulas: [
      { label: 'Corresponding Angles (Parallel)', latex: '\\angle 1 = \\angle 5' },
      { label: 'Alternate Interior Angles (Parallel)', latex: '\\angle 3 = \\angle 5' },
      { label: 'Supplementary Angles', latex: '\\angle 1 + \\angle 2 = 180^\\circ' },
    ],
    proofSteps: [
      { text: 'A transversal cuts two lines.', latex: 't \\text{ cuts } l_1, l_2' },
      { text: 'If lines are parallel, corresponding angles are equal.', latex: 'l_1 \\parallel l_2 \\implies \\angle 1 = \\angle 5' },
      { text: 'Alternate interior angles are also equal.', latex: '\\angle 3 = \\angle 5' },
    ],
    Scene: LinesAndAnglesScene,
  }
]
