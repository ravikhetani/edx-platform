"""
Tests for user utils functionality.
"""
from django.test import TestCase
from datetime import datetime
from openedx.core.djangoapps.user_authn.views.utils import get_auto_generated_username
import ddt


@ddt.ddt
class TestGenerateUsername(TestCase):
    """
    Test case for the get_auto_generated_username function.
    """

    @ddt.data(
        ({'first_name': 'John', 'last_name': 'Doe'}, "JD"),
        ({'name': 'Jane Smith'}, "JS"),
        ({'name': 'Jane'}, "J"),
        ({'name': 'John Doe Smith'}, "JD")
    )
    @ddt.unpack
    def test_generate_username_from_data(self, data, expected_initials):
        """
        Test get_auto_generated_username function.
        """
        current_year_month = f"_{datetime.now().year % 100}{datetime.now().month:02d}_"
        username = get_auto_generated_username(data)
        expected_username = expected_initials + current_year_month
        self.assertEqual(username[:-4], expected_username)
